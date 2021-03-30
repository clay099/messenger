import { Message } from "../interface/Message";

const mockChatMessages: Message[] = [
	{
		id: 1,
		content: "first message",
		senderEmail: "mockLoggedInUser@gmail.com",
		chatId: 1,
		createdAt: new Date(Date.now() - 60 * 60 * 60 * 100),
		user: {
			username: "mock LoggedIn user",
			email: "mockLoggedInUser@gmail.com",
		},
	},
	{
		id: 2,
		content: "second message",
		senderEmail: "mockLoggedInUser@gmail.com",
		chatId: 1,
		createdAt: new Date(Date.now() - 60 * 59 * 100),
		user: {
			username: "mock LoggedIn user",
			email: "mockLoggedInUser@gmail.com",
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
	{
		id: 4,
		content: "other use message test 2",
		senderEmail: "differentUser@gmail.com",
		chatId: 1,
		createdAt: new Date(Date.now() - 60 * 40 * 100),
		user: {
			username: "Different User",
			email: "differentUser@gmail.com",
		},
	},
	{
		id: 5,
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		senderEmail: "mockLoggedInUser@gmail.com",
		chatId: 1,
		createdAt: new Date(Date.now() - 60 * 20 * 100),
		user: {
			username: "mock LoggedIn user",
			email: "mockLoggedInUser@gmail.com",
		},
	},
	{
		id: 6,
		content: "last message",
		senderEmail: "differentUser@gmail.com",
		chatId: 1,
		createdAt: new Date(Date.now() - 60 * 20 * 100),
		user: {
			username: "Different User",
			email: "differentUser@gmail.com",
		},
	},
];

export default mockChatMessages;
