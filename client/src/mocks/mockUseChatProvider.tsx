import { FunctionComponent } from "react";
import { ChatContext } from "../context/useChatContext";
import mockChatMessages from "./mockChatMessages";

const MockUseChatProvider: FunctionComponent = ({ children }) => {
	return (
		<ChatContext.Provider
			value={{
				chatId: 1,
				selectChatId: jest.fn(),
				otherUser: { email: "mock@gmail.com", username: "mock user" },
				saveOtherUser: jest.fn(),
				activeChatMessages: mockChatMessages,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export default MockUseChatProvider;
