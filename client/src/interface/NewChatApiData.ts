import { User } from "./User";

export interface ChatApiData {
	chat: { id: number; createdAt: Date; updatedAt: Date };
	users: User[];
}
export interface SentNewChatApiData extends ChatApiData {
	email: string;
}
export interface CreatedNewChatApiData extends ChatApiData {
	message: string;
}

export interface NewChatApiData {
	created?: CreatedNewChatApiData;
	error?: { message: string };
}
