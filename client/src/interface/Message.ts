import { User } from "./User";
export interface Message {
	id: number;
	content: string;
	senderEmail: string;
	chatId: number;
	createdAt: Date;
	user: User;
}
