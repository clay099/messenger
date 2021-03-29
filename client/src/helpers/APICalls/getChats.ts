import { User } from "../../interface/User";
import { UserChat } from "../../interface/UserChats";
import mockChats from "../../mocks/mockChats";

interface Props {
	selectChatId: (id: number) => void;
	saveOtherUser: (user: User) => void;
	saveUserChats: (userChats: UserChat[]) => void;
	removeUserChats: () => void;
}
export async function getChats({
	selectChatId,
	saveOtherUser,
	saveUserChats,
	removeUserChats,
}: Props) {
	const fetchOptions = {
		method: "GET",
	};

	await fetch("/api/chat", fetchOptions)
		.then((res) => res.json())
		.then((data) => {
			//NOTE: we also want last message from chat, backend api route needs to be updated

			//TODO: upon connection, get this from backend and delete mockChats variable
			saveUserChats(mockChats);
			// default to the first chat being displayed
			selectChatId(mockChats[0].chatId);
			saveOtherUser(mockChats[0].user);
		})
		.catch((error) => {
			// think of what to do with error once connected
			console.log({ error });

			// remove this line, only used for testing dashboard
			saveUserChats(mockChats);
			selectChatId(mockChats[0].chatId);
			saveOtherUser(mockChats[0].user);
			// add in following lines. only commented out for testing dashboard
			// removeUserChats(null);
			// selectChatId(null)
		});
}
