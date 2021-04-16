import { AuthApiData } from "../../interface/AuthApiData";

const loginWithCookies = async (): Promise<AuthApiData> => {
	const fetchOptions = {
		method: "GET",
	};
	return await fetch(
		process.env.REACT_APP_API_URL
			? `${process.env.REACT_APP_API_URL}/loginwithcookies`
			: `/loginwithcookies`,
		fetchOptions
	)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
};

export default loginWithCookies;
