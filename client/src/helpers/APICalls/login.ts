import { AuthApiData } from "../../interface/AuthApiData";

const login = async (email: string, password: string) => {
	const fetchOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	};
	return await fetch(`/login`, fetchOptions).then(
		(res) => res.json() as AuthApiData
	);
};

export default login;
