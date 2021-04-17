import { AuthApiData } from "../../interface/AuthApiData";
import { FetchOptions } from "../../interface/FetchOptions";

const loginWithCookies = async (): Promise<AuthApiData> => {
	const fetchOptions: FetchOptions = {
		method: "GET",
		withCredentials: true,
		credentials: "include",
	};
	return await fetch(`/loginwithcookies`, fetchOptions)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
};

export default loginWithCookies;
