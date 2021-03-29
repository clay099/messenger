import { Message } from "../../interface/Message";
import mockChatMessages from "../../mocks/mockChatMessages";

interface Props {
	chatId: number;
	saveChatMessages: (messages: Message[]) => void;
	removeChatMessages: () => void;
}
export async function getChatMessages({
	chatId,
	saveChatMessages,
	removeChatMessages,
}: Props) {
	const fetchOptions = {
		method: "GET",
	};
	await fetch(`/api/chat/${chatId}`, fetchOptions)
		.then((res) => res.json())
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
