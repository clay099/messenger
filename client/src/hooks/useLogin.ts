import { useHistory } from "react-router-dom";

// Login middleware placeholder
function useLogin() {
	const history = useHistory();

	const login = async (email: string, password: string) => {
		console.log(email, password);
		const res = await fetch(
			`/auth/login?email=${email}&password=${password}`
		).then((res) => res.json());
		localStorage.setItem("user", res.user);
		localStorage.setItem("token", res.token);
		history.push("/dashboard");
	};
	return login;
}

export default useLogin;
