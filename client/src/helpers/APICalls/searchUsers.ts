import { SearchUsersApiData } from "../../interface/User";

interface Props {
	search: string;
}

export async function searchUsers({
	search,
}: Props): Promise<SearchUsersApiData> {
	const fetchOptions = {
		method: "GET",
	};
	return await fetch(`/api/users?search=${search}`, fetchOptions)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
}
