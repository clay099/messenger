import { UserChatsApiData } from "../../interface/UserChats";

export async function getChats(): Promise<UserChatsApiData> {
	const fetchOptions = {
		method: "GET",
	};

	return await fetch(
		process.env.REACT_APP_API_URL
			? `${process.env.REACT_APP_API_URL}/api/chat`
			: "/api/chat",
		fetchOptions
	)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
}
