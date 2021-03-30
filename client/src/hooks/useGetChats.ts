import { useState, useEffect } from "react";
import { UserChat } from "../interface/UserChats";
import { useChat } from "../context/useChatContext";
import { getChats } from "../helpers/APICalls/getChats";
import mockChats from "../mocks/mockChats";

export default function useGetChats() {
	const [userChats, setUserChats] = useState<UserChat[] | null>(null);
	const { selectActiveChat } = useChat();

	const saveUserChats = (userChats: UserChat[]) => {
		setUserChats(userChats);
	};
	const removeUserChats = () => {
		setUserChats(null);
	};

	useEffect(() => {
		getChats()
			.then((data) => {
				//NOTE: we also want last message from chat, backend api route needs to be updated

				//TODO: upon connection, get this from backend and delete mockChats variable
				// TODO: handle Edge case for when user has not chats to display. Should be able to check for length and return []
				saveUserChats(mockChats);
				// default to the first chat being displayed
				selectActiveChat(mockChats[0]);
			})
			.catch((error) => {
				// think of what to do with error once connected
				console.log({ error });

				// remove this line, only used for testing dashboard
				saveUserChats(mockChats);
				selectActiveChat(mockChats[0]);
				// add in following lines. only commented out for testing dashboard
				// removeUserChats(null);
				// selectChatId(null)
			});
	}, [selectActiveChat]);

	return userChats;
}
