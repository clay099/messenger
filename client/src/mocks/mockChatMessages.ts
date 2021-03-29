import { Message } from "../interface/Message";

const mockChatMessages: Message[] = [
	{
		id: 1,
		content: "first message",
		senderEmail: "test@gmail.com",
		chatId: 1,
		createdAt: new Date(Date.now() - 60 * 60 * 60 * 100),
		user: {
			username: "test",
			email: "test@gmail.com",
		},
	},
	{
		id: 2,
		content: "second message",
		senderEmail: "test@gmail.com",
		chatId: 1,
		createdAt: new Date(Date.now() - 60 * 59 * 100),
		user: {
			username: "test",
			email: "test@gmail.com",
		},
	},
	{
		id: 3,
		content: "other use message",
		senderEmail: "differentUser@gmail.com",
		chatId: 1,
		createdAt: new Date(Date.now() - 60 * 50 * 100),
		user: {
			username: "Different User",
			email: "differentUser@gmail.com",
		},
	},
];

export default mockChatMessages;
