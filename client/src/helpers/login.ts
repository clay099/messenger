const login = async (email: string, password: string) => {
	const fetchOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	};
	return await fetch(`/auth/login`, fetchOptions).then((res) => res.json());
};

export default login;
