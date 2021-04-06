import { CreateMessageApiData } from "../../interface/Message";

export default async function submitMessage(chatId: number, message: string) {
	const fetchOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ message }),
	};
	return await fetch(`/api/message/${chatId}`, fetchOptions).then(
		(res) => res.json() as CreateMessageApiData
	);
}
