export interface UserChat {
	userEmail: string;
	chatId: number;
	createdAt: Date;
	updatedAt: Date;
	User: { username: string; email: string };
	lastMessage?: string;
	// look to transform this and save on DB
	readChat?: boolean;
}

export interface UserChatsApiData {
	messages?: UserChat[];
	error?: { message: string };
}
