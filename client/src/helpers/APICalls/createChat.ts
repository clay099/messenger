import { NewChatApiData } from "../../interface/NewChatApiData";

interface Props {
	email: string;
}

export async function createChat({ email }: Props): Promise<NewChatApiData> {
	const fetchOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email }),
	};
	return await fetch(`/api/chat`, fetchOptions)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
}
