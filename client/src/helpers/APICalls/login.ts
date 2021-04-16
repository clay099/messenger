import { AuthApiData } from "../../interface/AuthApiData";

const login = async (email: string, password: string): Promise<AuthApiData> => {
	const fetchOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	};
	return await fetch(
		process.env.REACT_APP_API_URL
			? `${process.env.REACT_APP_API_URL}/login`
			: `/login`,
		fetchOptions
	)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
};

export default login;
