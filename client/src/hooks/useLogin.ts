function useLogin() {
	const login = async (email: string, password: string) => {
		const fetchOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		};
		await fetch(`/auth/login`, fetchOptions).then((res) => res.json());
	};
	return login;
}

export default useLogin;
