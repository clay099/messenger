import { AuthApiData } from "../../interface/AuthApiData";
import { FetchOptions } from "../../interface/FetchOptions";

const register = async (
	username: string,
	email: string,
	password: string
): Promise<AuthApiData> => {
	const fetchOptions: FetchOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, email, password }),
		withCredentials: true,
		credentials: "include",
	};
	return await fetch(`/register`, fetchOptions)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
};

export default register;
