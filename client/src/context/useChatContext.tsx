import {
	useState,
	useContext,
	createContext,
	FunctionComponent,
	useEffect,
	useCallback,
} from "react";
import { Message } from "../interface/Message";
import { getChatMessages } from "../helpers/APICalls/getChatMessages";
import { UserChat } from "../interface/UserChats";
import { getChats } from "../helpers/APICalls/getChats";
import { createChat } from "../helpers/APICalls/createChat";
import submitMessage from "../helpers/APICalls/submitMessage";
import updateChatUnreadMessage from "../helpers/APICalls/updateChatUnreadMessage";
import { createdApiChatDataToUserChat } from "../helpers/newApiChatDataToUserChat";
import { useSnackBar } from "./useSnackbarContext";

interface UpdateChatUnreadCountProps {
	chatId: number;
	resetRead?: boolean;
}
interface IChatContext {
	activeChat: UserChat | null | undefined;
	selectActiveChat: (chat: UserChat) => void;
	activeChatMessages: Message[] | null | undefined;
	userChats: UserChat[] | null;
	createNewChat: (email: string) => void;
	handleNewMessage: (message: string, callback: () => void) => void;
	updateChatUnreadCount: ({
		chatId,
		resetRead,
	}: UpdateChatUnreadCountProps) => void;
}

export const ChatContext = createContext<IChatContext>({
	activeChat: undefined,
	selectActiveChat: () => null,
	activeChatMessages: undefined,
	userChats: null,
	createNewChat: () => null,
	handleNewMessage: () => null,
	updateChatUnreadCount: () => null,
});

export const ChatProvider: FunctionComponent = ({ children }) => {
	const [activeChat, setActiveChat] = useState<UserChat | null | undefined>(
		undefined
	);
	const [activeChatMessages, setActiveChatMessages] = useState<
		Message[] | null | undefined
	>(undefined);
	const [userChats, setUserChats] = useState<UserChat[] | null>(null);

	const { updateSnackBarMessage } = useSnackBar();

	const selectActiveChat = useCallback(async (chat: UserChat) => {
		setUserChats((state) => {
			if (!state) return null;
			return state.map((userChat) => {
				if (chat.chatId !== userChat.chatId) {
					return userChat;
				} else {
					return { ...userChat, readChat: true };
				}
			});
		});
		setActiveChat(chat);
	}, []);

	const saveChatMessages = useCallback((messages: Message[]) => {
		setActiveChatMessages(messages);
	}, []);

	const removeChatMessages = useCallback(() => {
		setActiveChatMessages(null);
	}, []);

	const saveUserChats = useCallback((userChats: UserChat[]) => {
		setUserChats(userChats);
	}, []);

	const removeUserChats = useCallback(() => {
		setUserChats(null);
		setActiveChat(null);
		setUserChats(null);
	}, []);

	const updateChatUnreadCount = useCallback(
		async ({ chatId, resetRead }: UpdateChatUnreadCountProps) => {
			if (resetRead && activeChat && activeChat.unread !== 0) {
				// if chat unread count is already 0 we don't want to update state or send to API
				setUserChats((userChats) => {
					if (!userChats) return null;
					return userChats.map((userChat) => {
						if (userChat.chatId === chatId) {
							return {
								...userChat,
								unread: 0,
							};
						} else {
							return userChat;
						}
					});
				});
				// send updated value to API
				updateChatUnreadMessage(chatId).then((data) => {
					if (data.error) {
						updateSnackBarMessage(data.error.message);
					}
				});
			} else if (!resetRead) {
				// only run this if we are incrementing the unread message count. No need to update API as it will increment based on the message being sent
				setUserChats((userChats) => {
					if (!userChats) return null;
					return userChats.map((userChat) => {
						if (userChat.chatId === chatId) {
							return {
								...userChat,
								unread: userChat.unread + 1,
							};
						} else {
							return userChat;
						}
					});
				});
			}
		},
		[activeChat, updateSnackBarMessage]
	);

	const createNewChat = useCallback(
		(email: string) => {
			if (email) {
				createChat({ email }).then((data) => {
					if (data.created) {
						removeChatMessages();
						// create new userChat object
						const newUserChat = createdApiChatDataToUserChat(
							data.created
						);
						setActiveChat(newUserChat);
						setUserChats((state) => {
							if (!state) return [newUserChat];
							return [...state, newUserChat];
						});
					} else if (data.error) {
						updateSnackBarMessage(data.error.message);
					} else {
						// should not get here but future proof for change in API
						updateSnackBarMessage(
							"An unexpected error occurred. Please try again"
						);
					}
				});
			}
		},
		[removeChatMessages, updateSnackBarMessage]
	);

	const handleNewMessage = useCallback(
		async (message: string, resetForm: () => void) => {
			if (activeChat) {
				submitMessage(activeChat.chatId, message).then((data) => {
					if (data.createdMessage) {
						const newMessage = data.createdMessage;
						setActiveChatMessages((activeChatState) => {
							if (activeChatState) {
								return [...activeChatState, newMessage];
							} else {
								return [newMessage];
							}
						});
						setUserChats((userChatState) => {
							if (!userChatState) return null;
							return userChatState.map((userChat) => {
								if (newMessage.chatId !== userChat.chatId) {
									return userChat;
								} else {
									return {
										...userChat,
										lastMessage: newMessage.content,
									};
								}
							});
						});
					} else if (data.error) {
						updateSnackBarMessage(data.error.message);
					} else {
						// should not get here but future proof for change in API
						updateSnackBarMessage(
							"An unexpected error occurred. Please try again"
						);
					}
				});
				resetForm();
			}
		},
		[activeChat, updateSnackBarMessage]
	);

	// get active chat messages
	useEffect(() => {
		if (
			activeChat &&
			(!activeChatMessages ||
				activeChatMessages[0].chatId !== activeChat.chatId)
		) {
			if (activeChat.lastMessage) {
				getChatMessages({
					chatId: activeChat.chatId,
				}).then((data) => {
					if (data.messages) {
						saveChatMessages(data.messages);
					} else if (data.error) {
						updateSnackBarMessage(data.error.message);
						removeChatMessages();
					} else {
						// should not get here but future proof for change in API
						updateSnackBarMessage(
							"An unexpected error occurred. Please try again"
						);
						removeChatMessages();
					}
				});
			} else {
				removeChatMessages();
			}
		}
	}, [
		activeChat,
		saveChatMessages,
		removeChatMessages,
		activeChatMessages,
		updateSnackBarMessage,
	]);

	// get user Chat messages
	useEffect(() => {
		getChats().then((data) => {
			if (data.messages) {
				saveUserChats(data.messages);
				if (data.messages.length === 0) {
					setActiveChat(null);
				} else {
					selectActiveChat(data.messages[0]);
				}
			} else {
				removeUserChats();
			}
		});
	}, [selectActiveChat, saveUserChats, removeUserChats]);

	return (
		<ChatContext.Provider
			value={{
				activeChatMessages,
				activeChat,
				selectActiveChat,
				userChats,
				createNewChat,
				handleNewMessage,
				updateChatUnreadCount,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export function useChat() {
	return useContext(ChatContext);
}
