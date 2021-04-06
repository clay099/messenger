import { UserChatsApiData } from "../../interface/UserChats";

export async function getChats() {
	const fetchOptions = {
		method: "GET",
	};

	return await fetch("/api/chat", fetchOptions).then(
		(res) => res.json() as UserChatsApiData
	);
}
