import { SearchUsersApiData } from "../../interface/User";

interface Props {
	search: string;
}

export async function searchUsers({ search }: Props) {
	const fetchOptions = {
		method: "GET",
	};
	return await fetch(`/api/users?search=${search}`, fetchOptions).then(
		(res) => res.json() as SearchUsersApiData
	);
}
