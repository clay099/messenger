import { useHistory } from "react-router-dom";

function useRegister() {
	const history = useHistory();

	const login = async (username: string, email: string, password: string) => {
		console.log(email, password);
		const res = await fetch(
			`/auth/signup?username=${username}&email=${email}&password=${password}`
		).then((res) => res.json());
		console.log(res);
		localStorage.setItem("user", res.user);
		localStorage.setItem("token", res.token);
		history.push("/dashboard");
	};
	return login;
}

export default useRegister;
