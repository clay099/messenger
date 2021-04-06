import { FunctionComponent } from "react";
import { ChatContext } from "../context/useChatContext";
import { mockChatMessages } from "./mockChatMessages";
import mockChats from "./mockChats";

const MockUseChatProvider: FunctionComponent = ({ children }) => {
	return (
		<ChatContext.Provider
			value={{
				activeChat: mockChats[0],
				selectActiveChat: jest.fn(),
				activeChatMessages: mockChatMessages,
				userChats: mockChats,
				createNewChat: jest.fn(),
				handleNewMessage: jest.fn(),
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export default MockUseChatProvider;
