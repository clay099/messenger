import { AuthApiData } from "../../interface/AuthApiData";
import { FetchOptions } from "../../interface/FetchOptions";

const logout = async (): Promise<AuthApiData> => {
	const fetchOptions: FetchOptions = {
		method: "GET",
		credentials: "include",
	};
	return await fetch(
		process.env.REACT_APP_API_URL
			? `${process.env.REACT_APP_API_URL}logout`
			: `/logout`,
		fetchOptions
	)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
};

export default logout;
