import { Message } from "./Message";

export interface SocketConnection {
	onlineUsers: string[];
}

export interface SocketNewMessage {
	message: Message;
}
