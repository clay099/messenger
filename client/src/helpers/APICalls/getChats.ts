import { UserChatsApiData } from "../../interface/UserChats";

export async function getChats(): Promise<UserChatsApiData> {
	const fetchOptions = {
		method: "GET",
	};

	return await fetch("/api/chat", fetchOptions)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
}
