import { UserChatUpdateApiData } from "../../interface/UserChats";
import { FetchOptions } from "../../interface/FetchOptions";

// give useability to set the unread number at an arbitrary value, but expect this to be used to reset the message as all values being read
export default async function updateChatUnreadMessage(
	chatId: number,
	unread = 0
): Promise<UserChatUpdateApiData> {
	const fetchOptions: FetchOptions = {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ unread }),
		withCredentials: true,
		credentials: "include",
	};
	return await fetch(
		process.env.REACT_APP_API_URL
			? `${process.env.REACT_APP_API_URL}/api/chat/${chatId}`
			: `/api/chat/${chatId}`,
		fetchOptions
	)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
}
