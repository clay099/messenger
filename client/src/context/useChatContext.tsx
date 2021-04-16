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
import { newApiChatDataToUserChat } from "../helpers/newApiChatDataToUserChat";
import { useSnackBar } from "./useSnackbarContext";
import { useSocket } from "../hooks/useSocket";
import { useAuth } from "./useAuthContext";
import { SocketTypingStatus } from "../interface/Socket";

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
	handleNewMessageSubmission: (message: string, callback: () => void) => void;
	updateChatUnreadCount: ({
		chatId,
		resetRead,
	}: UpdateChatUnreadCountProps) => void;
	onlineUsers: Set<string> | undefined;
	handleUserTyping: () => void;
}

export const ChatContext = createContext<IChatContext>({
	activeChat: undefined,
	selectActiveChat: () => null,
	activeChatMessages: undefined,
	userChats: null,
	createNewChat: () => null,
	handleNewMessageSubmission: () => null,
	updateChatUnreadCount: () => null,
	onlineUsers: undefined,
	handleUserTyping: () => null,
});

export const ChatProvider: FunctionComponent = ({ children }) => {
	const [activeChat, setActiveChat] = useState<UserChat | null | undefined>(
		undefined
	);
	const [activeChatMessages, setActiveChatMessages] = useState<
		Message[] | null | undefined
	>(undefined);
	const [userChats, setUserChats] = useState<UserChat[] | null>(null);
	const [userTyping, setUserTyping] = useState<boolean>(false);

	const { updateSnackBarMessage } = useSnackBar();
	const { loggedInUser } = useAuth();

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
		setUserChats([]);
		setActiveChat(null);
	}, []);

	// updates the unread count state & if all messages are read advise the API.
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
				// this only runs if we are incrementing the unread message count. No need to update API as it will increment based on the message being sent
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

	// create a new chat with the API & set that chat as active
	const createNewChat = useCallback(
		(email: string) => {
			if (email && loggedInUser) {
				createChat({ email }).then((data) => {
					if (data.created) {
						removeChatMessages();
						// create new userChat object
						const newUserChat = newApiChatDataToUserChat({
							data: data.created,
							loggedInUserEmail: loggedInUser.email,
						});
						setActiveChat(newUserChat);
						// socket is now responsible for saving the chat into UserChat state
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
		[removeChatMessages, updateSnackBarMessage, loggedInUser]
	);

	// create a new userChat when received via socket. If you created the chat (see above function) you will set that chat as the active chat.
	const handleNewChat = useCallback((newUserChat: UserChat) => {
		setUserChats((state) => {
			if (!state) return [newUserChat];
			// new chat will appear at top of list
			return [newUserChat, ...state];
		});
	}, []);

	const handleUserTyping = useCallback(() => {
		if (activeChat && loggedInUser && !userTyping) {
			setUserTyping(true);
		}
	}, [activeChat, loggedInUser, userTyping]);

	const handleUserStopTyping = useCallback(() => {
		setUserTyping(false);
	}, []);

	useEffect(() => {
		let timerId: null | ReturnType<typeof setTimeout> = null;
		if (userTyping) {
			timerId = setTimeout(handleUserStopTyping, 2000);
		}
		return () => {
			if (timerId) {
				clearTimeout(timerId);
			}
		};
	}, [userTyping, handleUserStopTyping]);

	const handleReceivedTyping = useCallback(
		({ email, chatId }: SocketTypingStatus) => {
			if (email !== loggedInUser?.email) {
				setUserChats((userChatState) => {
					if (!userChatState) return null;
					return userChatState.map((userChat) => {
						if (chatId !== userChat.chatId) {
							return userChat;
						} else {
							return {
								...userChat,
								typing: true,
							};
						}
					});
				});
				if (activeChat?.chatId === chatId) {
					setActiveChat((activeChatState) => {
						if (!activeChatState) return activeChatState;
						return {
							...activeChatState,
							typing: true,
						};
					});
				}
			}
		},
		[loggedInUser?.email, activeChat?.chatId]
	);

	const handleReceivedStopTyping = useCallback(
		({ email, chatId }: SocketTypingStatus) => {
			if (email !== loggedInUser?.email) {
				setUserChats((userChatState) => {
					if (!userChatState) return null;
					return userChatState.map((userChat) => {
						if (chatId !== userChat.chatId) {
							return userChat;
						} else {
							return {
								...userChat,
								typing: false,
							};
						}
					});
				});
				if (activeChat?.chatId === chatId) {
					setActiveChat((activeChatState) => {
						if (!activeChatState) return activeChatState;
						return {
							...activeChatState,
							typing: false,
						};
					});
				}
			}
		},
		[loggedInUser?.email, activeChat?.chatId]
	);

	// submit a new message to the API
	const handleNewMessageSubmission = useCallback(
		async (message: string, resetForm: () => void) => {
			if (activeChat) {
				handleUserStopTyping();
				submitMessage(activeChat.chatId, message).then((data) => {
					if (data.createdMessage) {
						// this logic now handled by sockets & the below useEffect
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
		[activeChat, updateSnackBarMessage, handleUserStopTyping]
	);

	// when sockets receive a new message save the data for relevant chat context so the user can display & reset the socketContext state to be ready to receive a new message
	const handleNewSocketMessage = useCallback(
		(newMessage: Message) => {
			setUserChats((userChatState) => {
				if (!userChatState) return null;
				return userChatState.map((userChat) => {
					if (newMessage.chatId !== userChat.chatId) {
						return userChat;
					} else {
						return {
							...userChat,
							lastMessage: newMessage.content,
							unread: userChat.unread + 1,
						};
					}
				});
			});
			if (activeChat?.chatId === newMessage.chatId) {
				setActiveChatMessages((activeChatMessagesState) => {
					if (activeChatMessagesState) {
						return [...activeChatMessagesState, newMessage];
					} else {
						return [newMessage];
					}
				});
				setActiveChat((activeChatState) => {
					if (!activeChatState) return activeChatState;
					return {
						...activeChatState,
						lastMessage: newMessage.content,
						unread: activeChatState.unread + 1,
					};
				});
			}
		},
		[activeChat?.chatId]
	);

	const { onlineUsers } = useSocket({
		handleNewChat,
		userChats,
		handleNewSocketMessage,
		userTyping,
		activeChat,
		handleReceivedTyping,
		handleReceivedStopTyping,
	});

	// get active chat messages from API
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
				handleNewMessageSubmission,
				updateChatUnreadCount,
				onlineUsers,
				handleUserTyping,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export function useChat() {
	return useContext(ChatContext);
}
