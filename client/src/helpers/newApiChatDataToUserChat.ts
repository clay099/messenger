import { ChatApiData } from "../interface/NewChatApiData";
import { UserChat } from "../interface/UserChats";

interface Props {
	data: ChatApiData;
	loggedInUserEmail: string;
}
// function to create the object without needing to do a API query
export function newApiChatDataToUserChat({
	data,
	loggedInUserEmail,
}: Props): UserChat {
	// if application is extended to multiple user chats this will need to be extended along with UserChat model to allow for multiple other users;
	const otherUser = data.users.filter(
		(user) => user.email !== loggedInUserEmail
	)[0];
	return {
		userEmail: otherUser.email,
		chatId: data.chat.id,
		createdAt: data.chat.createdAt,
		updatedAt: data.chat.updatedAt,
		user: otherUser,
		unread: 0,
	};
}
