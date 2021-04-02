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

import {
	mockChatMessages,
	mockChatMessages2,
	mockChatMessages3,
} from "../mocks/mockChatMessages";
import mockChats from "../mocks/mockChats";

interface IChatContext {
	activeChat: UserChat | null;
	selectActiveChat: (chat: UserChat) => void;
	activeChatMessages: Message[] | null;
	userChats: UserChat[] | null;
}

export const ChatContext = createContext<IChatContext>({
	activeChat: null,
	selectActiveChat: () => null,
	activeChatMessages: null,
	userChats: null,
});

export const ChatProvider: FunctionComponent = ({ children }) => {
	const [activeChat, setActiveChat] = useState<UserChat | null>(null);
	const [activeChatMessages, setActiveChatMessages] = useState<
		Message[] | null
	>(null);
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

	// get active chat messages
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

					// remove below line, only used for testing dashboard in development
					let displayMockMessage =
						activeChat.chatId === mockChatMessages[0].chatId
							? mockChatMessages
							: activeChat.chatId === mockChatMessages2[0].chatId
							? mockChatMessages2
							: mockChatMessages3;
					saveChatMessages(displayMockMessage);

					// add in following line. only commented out for testing dashboard
					// removeChatMessages();
				});
		}
		return () => removeChatMessages();
		// once connected with socket io. Look to only get chat the first time and the just get new messages and not re-fetch entire conversation every time.
	}, [activeChat, saveChatMessages, removeChatMessages]);

	// get user Chat messages
	useEffect(() => {
		getChats()
			.then((data) => {
				//NOTE: we also want last message from chat, backend api route needs to be updated

				//TODO: upon connection, get this from backend and delete mockChats variable
				// TODO: handle Edge case for when user has not chats to display. Should be able to check for length and return []
				saveUserChats(mockChats);
				// default to the first chat being displayed
				selectActiveChat(mockChats[0]);
			})
			.catch((error) => {
				// think of what to do with error once connected
				console.log({ error });

				// remove this line, only used for testing dashboard
				saveUserChats(mockChats);
				selectActiveChat(mockChats[0]);
				// add in following lines. only commented out for testing dashboard
				// removeUserChats(null);
				// selectChatId(null)
			});
	}, [selectActiveChat, saveUserChats]);

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
