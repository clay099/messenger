import { User } from "../../interface/User";

interface Props {
	active: boolean;
	search: string;
	saveOptions: (users: User[]) => void;
}

export async function searchUsers({ active, search, saveOptions }: Props) {
	const fetchOptions = {
		method: "GET",
	};
	const response = await fetch(`/api/users?search=${search}`, fetchOptions);
	const users = await response.json();

	if (active) {
		saveOptions(users);
	}
}
