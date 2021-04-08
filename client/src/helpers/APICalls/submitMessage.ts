import { CreateMessageApiData } from "../../interface/Message";

export default async function submitMessage(
	chatId: number,
	message: string
): Promise<CreateMessageApiData> {
	const fetchOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ message }),
	};
	return await fetch(`/api/message/${chatId}`, fetchOptions)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
}
