import {
	useState,
	useContext,
	createContext,
	FunctionComponent,
	useEffect,
	useCallback,
} from "react";
import { useHistory } from "react-router-dom";

interface IAuthContext {
	loggedIn: boolean | null;
	updateLoginContext: () => void;
	logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
	loggedIn: null,
	updateLoginContext: () => null,
	logout: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }) => {
	// if null we are still running the original login useEffect
	const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
	const history = useHistory();

	const updateLoginContext = useCallback(() => {
		setLoggedIn(true);
		history.push("/dashboard");
	}, [history]);

	const logout = () => {
		setLoggedIn(false);
		history.push("/login");
	};

	// use our cookies to check if we can login straight away
	useEffect(() => {
		const checkLoginWithCookies = async () => {
			const fetchOptions = {
				method: "GET",
			};
			await fetch("/login", fetchOptions)
				.then((res) => res.json())
				.then((data) => {
					//TODO: check that if we get here we have successfully logged in
					console.log({ data });
					updateLoginContext();
				})
				.catch((error) => {
					// think we should be able to ignore error, if we can't login we don't care about error
					console.log({ error });
					setLoggedIn(false);
				});
		};

		checkLoginWithCookies();
	}, [updateLoginContext]);

	return (
		<AuthContext.Provider value={{ loggedIn, updateLoginContext, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	return useContext(AuthContext);
}
