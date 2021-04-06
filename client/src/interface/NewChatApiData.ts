import { User } from "./User";

export interface CreatedNewChatApiData {
	message: string;
	chat: { id: number; createdAt: Date; updatedAt: Date };
	otherUser: User;
}

export interface NewChatApiData {
	created?: CreatedNewChatApiData;
	error?: { message: string };
}
