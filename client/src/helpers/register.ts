const register = async (username: string, email: string, password: string) => {
	const fetchOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, email, password }),
	};
	return await fetch(`/register`, fetchOptions).then((res) => res.json());
};

export default register;
