import { CreatedNewChatApiData } from "../interface/NewChatApiData";
import { UserChat } from "../interface/UserChats";

export function createdApiChatDataToUserChat(
	data: CreatedNewChatApiData
): UserChat {
	return {
		userEmail: data.otherUser.email,
		chatId: data.chat.id,
		createdAt: data.chat.createdAt,
		updatedAt: data.chat.updatedAt,
		User: data.otherUser,
		readChat: true,
	};
}
