import { User } from "./User";
export interface Message {
	id: number;
	content: string;
	senderEmail: string;
	chatId: number;
	createdAt: string;
	user: User;
}

export interface MessageApiData {
	messages?: Message[];
	error?: { message: string };
	// occurs if there are no messages in the chat
	message?: string;
}

export interface CreateMessageApiData {
	createdMessage?: Message;
	error?: { message: string };
}
