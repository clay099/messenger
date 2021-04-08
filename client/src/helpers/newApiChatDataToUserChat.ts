import { CreatedNewChatApiData } from "../interface/NewChatApiData";
import { UserChat } from "../interface/UserChats";

// function to create the object without needing to do a API query
export function createdApiChatDataToUserChat(
	data: CreatedNewChatApiData
): UserChat {
	return {
		userEmail: data.otherUser.email,
		chatId: data.chat.id,
		createdAt: data.chat.createdAt,
		updatedAt: data.chat.updatedAt,
		user: data.otherUser,
		unread: 0,
	};
}
