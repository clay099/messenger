import { FetchOptions } from "../../interface/FetchOptions";
import { MessageApiData } from "../../interface/Message";

interface Props {
	chatId: number;
}
export async function getChatMessages({
	chatId,
}: Props): Promise<MessageApiData> {
	const fetchOptions: FetchOptions = {
		method: "GET",
		withCredentials: true,
		credentials: "include",
	};
	return await fetch(`/api/chat/${chatId}`, fetchOptions)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
}
