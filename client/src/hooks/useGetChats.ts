import { useState, useEffect } from "react";
import { UserChat } from "../interface/UserChats";
import { useChat } from "../context/useChatContext";
import { getChats } from "../helpers/APICalls/getChats";

export default function useGetChats() {
	const [userChats, setUserChats] = useState<UserChat[] | null>(null);
	const { selectChatId, saveOtherUser } = useChat();

	const saveUserChats = (userChats: UserChat[]) => {
		setUserChats(userChats);
	};
	const removeUserChats = () => {
		setUserChats(null);
	};

	useEffect(() => {
		getChats({
			selectChatId,
			saveOtherUser,
			saveUserChats,
			removeUserChats,
		});
	}, [selectChatId, saveOtherUser]);

	return userChats;
}
