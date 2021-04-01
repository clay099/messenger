interface Props {
	chatId: number;
}
export async function getChatMessages({ chatId }: Props) {
	const fetchOptions = {
		method: "GET",
	};
	return await fetch(`/api/chat/${chatId}`, fetchOptions).then((res) =>
		res.json()
	);
}
