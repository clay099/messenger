import { Message } from "./Message";

export interface SocketConnection {
	onlineUsers: string[];
}

export interface SocketNewMessage {
	message: Message;
}

export interface SocketTypingStatus {
	email: string;
	chatId: number;
}
