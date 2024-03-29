import { UserChat } from "../interface/UserChats";

const mockChats: UserChat[] = [
	{
		userEmail: "mockTestUser1@gmail.com",
		chatId: 1,
		createdAt: new Date(Date.now()),
		updatedAt: new Date(Date.now()),
		user: {
			username: "Mock test user 1",
			email: "mockTestUser1@gmail.com",
		},
		lastMessage: "last message from user 1",
		unread: 0,
	},
	{
		userEmail: "mockTestUser2@gmail.com",
		chatId: 2,
		createdAt: new Date(Date.now()),
		updatedAt: new Date(Date.now()),
		user: {
			username: "Mock test user 2",
			email: "mockTestUser2@gmail.com",
		},
		lastMessage: "last message from user 2",
		unread: 0,
	},
	{
		userEmail: "mockTestUser3@gmail.com",
		chatId: 3,
		createdAt: new Date(Date.now()),
		updatedAt: new Date(Date.now()),
		user: {
			username: "Mock test user 3",
			email: "mockTestUser3@gmail.com",
		},
		lastMessage:
			"last message from user 3. This is a test for a long message",
		unread: 1,
	},
];

export default mockChats;
