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
import mockChatMessages from "../mocks/mockChatMessages";

interface IChatContext {
	activeChat: UserChat | null;
	selectActiveChat: (chat: UserChat) => void;
	activeChatMessages: Message[] | null;
	readChatIds: Set<number>;
}

const initialReadChatIds: Set<number> = new Set();

export const ChatContext = createContext<IChatContext>({
	activeChat: null,
	selectActiveChat: () => null,
	activeChatMessages: null,
	readChatIds: initialReadChatIds,
});

export const ChatProvider: FunctionComponent = ({ children }) => {
	const [activeChat, setActiveChat] = useState<UserChat | null>(null);
	const [activeChatMessages, setActiveChatMessages] = useState<
		Message[] | null
	>(null);
	const [readChatIds, setReadChatIds] = useState<Set<number>>(
		initialReadChatIds
	);

	const selectActiveChat = useCallback((chat: UserChat) => {
		setActiveChat(chat);
		setReadChatIds((state) => state.add(chat.chatId));
	}, []);

	const saveChatMessages = useCallback((messages: Message[]) => {
		setActiveChatMessages(messages);
	}, []);

	const removeChatMessages = useCallback(() => {
		setActiveChatMessages(null);
	}, []);

	useEffect(() => {
		if (activeChat) {
			getChatMessages({
				chatId: activeChat.chatId,
			})
				.then((data) => {
					//TODO: upon connection, get this from backend and delete mockUser variable
					saveChatMessages(mockChatMessages);
				})
				.catch((error) => {
					console.error({ error });

					// remove this line, only used for testing dashboard in development
					saveChatMessages(mockChatMessages);
					// add in following line. only commented out for testing dashboard
					// removeChatMessages();
				});
		}
		return () => removeChatMessages();
		// once connected with socket io. Look to only get chat the first time and the just get new messages and not re-fetch entire conversation every time.
	}, [activeChat, saveChatMessages, removeChatMessages]);

	return (
		<ChatContext.Provider
			value={{
				activeChatMessages,
				readChatIds,
				activeChat,
				selectActiveChat,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export function useChat() {
	return useContext(ChatContext);
}
