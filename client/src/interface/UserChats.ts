export interface UserChat {
	userEmail: string;
	chatId: number;
	createdAt: Date;
	updatedAt: Date;
	user: { username: string; email: string };
	lastMessage: { message: string };
}
