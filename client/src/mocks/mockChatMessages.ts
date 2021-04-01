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
		senderEmail: "mockTestUser1@gmail.com",
		chatId: 1,
		createdAt: new Date(Date.now() - 60 * 50 * 100),
		user: {
			username: "Mock test user 1",
			email: "mockTestUser1@gmail.com",
		},
	},
	{
		id: 4,
		content: "other use message test 2",
		senderEmail: "mockTestUser1@gmail.com",
		chatId: 1,
		createdAt: new Date(Date.now() - 60 * 40 * 100),
		user: {
			username: "Mock test user 1",
			email: "mockTestUser1@gmail.com",
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
		senderEmail: "mockTestUser1@gmail.com",
		chatId: 1,
		createdAt: new Date(Date.now() - 60 * 20 * 100),
		user: {
			username: "Mock test user 1",
			email: "mockTestUser1@gmail.com",
		},
	},
];

const mockChatMessages2: Message[] = [
	{
		id: 1,
		content: "first message of chat 2",
		senderEmail: "mockLoggedInUser@gmail.com",
		chatId: 2,
		createdAt: new Date(Date.now() - 60 * 60 * 60 * 100),
		user: {
			username: "mock LoggedIn user",
			email: "mockLoggedInUser@gmail.com",
		},
	},
	{
		id: 2,
		content: "second message of chat 2",
		senderEmail: "mockTestUser2@gmail.com",
		chatId: 2,
		createdAt: new Date(Date.now() - 60 * 59 * 100),
		user: {
			username: "Mock test user 2",
			email: "mockTestUser2@gmail.com",
		},
	},
];

const mockChatMessages3: Message[] = [
	{
		id: 1,
		content: "first message of chat 3",
		senderEmail: "mockTestUser3@gmail.com",
		chatId: 3,
		createdAt: new Date(Date.now() - 60 * 59 * 100),
		user: {
			username: "Mock test user 3",
			email: "mockTestUser3@gmail.com",
		},
	},
	{
		id: 2,
		content: "second message of chat 3",
		senderEmail: "mockLoggedInUser@gmail.com",
		chatId: 3,
		createdAt: new Date(Date.now() - 60 * 60 * 60 * 100),
		user: {
			username: "mock LoggedIn user",
			email: "mockLoggedInUser@gmail.com",
		},
	},
	{
		id: 3,
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		senderEmail: "mockLoggedInUser@gmail.com",
		chatId: 3,
		createdAt: new Date(Date.now() - 60 * 60 * 60 * 100),
		user: {
			username: "mock LoggedIn user",
			email: "mockLoggedInUser@gmail.com",
		},
	},
	{
		id: 4,
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		senderEmail: "mockLoggedInUser@gmail.com",
		chatId: 3,
		createdAt: new Date(Date.now() - 60 * 60 * 60 * 100),
		user: {
			username: "mock LoggedIn user",
			email: "mockLoggedInUser@gmail.com",
		},
	},
	{
		id: 1,
		content: "last message of chat 3",
		senderEmail: "mockTestUser3@gmail.com",
		chatId: 3,
		createdAt: new Date(Date.now() - 60 * 59 * 100),
		user: {
			username: "Mock test user 3",
			email: "mockTestUser3@gmail.com",
		},
	},
];

export { mockChatMessages, mockChatMessages2, mockChatMessages3 };
