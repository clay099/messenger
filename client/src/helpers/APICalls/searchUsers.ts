import { FetchOptions } from "../../interface/FetchOptions";
import { SearchUsersApiData } from "../../interface/User";

interface Props {
	search: string;
}

export async function searchUsers({
	search,
}: Props): Promise<SearchUsersApiData> {
	const fetchOptions: FetchOptions = {
		method: "GET",
		credentials: "include",
	};
	return await fetch(
		process.env.REACT_APP_API_URL
			? `${process.env.REACT_APP_API_URL}api/users?search=${search}`
			: `/api/users?search=${search}`,
		fetchOptions
	)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
}
