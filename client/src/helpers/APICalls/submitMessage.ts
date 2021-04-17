import { FetchOptions } from "../../interface/FetchOptions";
import { CreateMessageApiData } from "../../interface/Message";

export default async function submitMessage(
	chatId: number,
	message: string
): Promise<CreateMessageApiData> {
	const fetchOptions: FetchOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ message }),
		withCredentials: true,
		credentials: "include",
	};
	return await fetch(`/api/message/${chatId}`, fetchOptions)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
}
