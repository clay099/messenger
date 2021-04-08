export interface UserChat {
	userEmail: string;
	chatId: number;
	createdAt: Date;
	updatedAt: Date;
	user: { username: string; email: string };
	unread: number;
	lastMessage?: string;
}

export interface UserChatsApiData {
	messages?: UserChat[];
	error?: { message: string };
}

export interface UserChatUpdateApiData {
	message?: string;
	error?: { message: string };
}
