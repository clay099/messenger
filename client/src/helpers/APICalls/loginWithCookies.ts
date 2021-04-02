import { AuthApiData } from "../../interface/AuthApiData";

const loginWithCookies = async () => {
	const fetchOptions = {
		method: "GET",
	};
	return await fetch(`/loginwithcookies`, fetchOptions).then(
		(res) => res.json() as AuthApiData
	);
};

export default loginWithCookies;
