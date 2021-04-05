import {
	useState,
	useContext,
	createContext,
	FunctionComponent,
	useEffect,
	useCallback,
} from "react";
import { Message, MessageApiData } from "../interface/Message";
import { getChatMessages } from "../helpers/APICalls/getChatMessages";
import { UserChat, UserChatsApiData } from "../interface/UserChats";
import { getChats } from "../helpers/APICalls/getChats";

interface IChatContext {
	activeChat: UserChat | null | undefined;
	selectActiveChat: (chat: UserChat) => void;
	activeChatMessages: Message[] | null | undefined;
	userChats: UserChat[] | null;
}

export const ChatContext = createContext<IChatContext>({
	activeChat: undefined,
	selectActiveChat: () => null,
	activeChatMessages: undefined,
	userChats: null,
});

export const ChatProvider: FunctionComponent = ({ children }) => {
	const [activeChat, setActiveChat] = useState<UserChat | null | undefined>(
		undefined
	);
	const [activeChatMessages, setActiveChatMessages] = useState<
		Message[] | null | undefined
	>(undefined);
	const [userChats, setUserChats] = useState<UserChat[] | null>(null);

	const selectActiveChat = useCallback((chat: UserChat) => {
		setActiveChat(chat);
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
				}).then((data: MessageApiData) => {
					if (data.messages) {
						saveChatMessages(data.messages);
					} else {
						removeChatMessages();
					}
				});
			} else {
				removeChatMessages();
			}
		}
	}, [activeChat, saveChatMessages, removeChatMessages, activeChatMessages]);

	// get user Chat messages
	useEffect(() => {
		getChats().then((data: UserChatsApiData) => {
			if (data.messages) {
				//NOTE: we also want last message from chat, backend api route needs to be updated

				saveUserChats(data.messages);
				// TODO: handle Edge case for when user has not chats to display. Should be able to check for length and return []
				// default to the first chat being displayed
				if (data.messages.length === 0) {
					setActiveChat(null);
				} else {
					selectActiveChat(data.messages[0]);
				}
			} else {
				// think of what to do with error once connected
				console.log({ error: data.error?.message });
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
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export function useChat() {
	return useContext(ChatContext);
}
