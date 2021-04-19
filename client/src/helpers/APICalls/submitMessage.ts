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
		credentials: "include",
	};
	return await fetch(
		process.env.REACT_APP_API_URL
			? `${process.env.REACT_APP_API_URL}api/message/${chatId}`
			: `/api/message/${chatId}`,
		fetchOptions
	)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
}
