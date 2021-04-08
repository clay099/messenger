import { AuthApiData } from "../../interface/AuthApiData";

const login = async (email: string, password: string): Promise<AuthApiData> => {
	const fetchOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	};
	return await fetch(`/login`, fetchOptions)
		.then((res) => res.json())
		.catch(() => ({
			error: { message: "Unable to connect to server. Please try again" },
		}));
};

export default login;
