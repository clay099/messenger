export async function getChats() {
	const fetchOptions = {
		method: "GET",
	};

	await fetch("/api/chat", fetchOptions).then((res) => res.json());
}
