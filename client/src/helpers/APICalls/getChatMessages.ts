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
		credentials: "include",
	};
	return await fetch(
		process.env.REACT_APP_API_URL
			? `${process.env.REACT_APP_API_URL}api/chat/${chatId}`
			: `/api/chat/${chatId}`,
		fetchOptions
	)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
}
