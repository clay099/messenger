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
import { User } from "../interface/User";

interface IChatContext {
	chatId: number | null;
	selectChatId: (id: number) => void;
	otherUser: User | null;
	saveOtherUser: (user: User) => void;
	activeChatMessages: Message[] | null;
}

export const ChatContext = createContext<IChatContext>({
	chatId: null,
	selectChatId: () => null,
	otherUser: null,
	saveOtherUser: () => null,
	activeChatMessages: null,
});

export const ChatProvider: FunctionComponent = ({ children }) => {
	const [chatId, setChatId] = useState<number | null>(null);
	const [otherUser, setOtherUser] = useState<User | null>(null);
	const [activeChatMessages, setActiveChatMessages] = useState<
		Message[] | null
	>(null);

	const selectChatId = useCallback((id: number) => {
		setChatId(id);
	}, []);

	const saveOtherUser = useCallback((user: User) => {
		setOtherUser(user);
	}, []);

	const saveChatMessages = useCallback((messages: Message[]) => {
		setActiveChatMessages(messages);
	}, []);

	const removeChatMessages = useCallback(() => {
		setActiveChatMessages(null);
	}, []);

	useEffect(() => {
		if (chatId) {
			getChatMessages({ chatId, saveChatMessages, removeChatMessages });
		}
		return () => removeChatMessages();
	}, [chatId, saveChatMessages, removeChatMessages]);

	return (
		<ChatContext.Provider
			value={{
				chatId,
				selectChatId,
				otherUser,
				saveOtherUser,
				activeChatMessages,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export function useChat() {
	return useContext(ChatContext);
}
