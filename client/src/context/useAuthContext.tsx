import {
	useState,
	useContext,
	createContext,
	FunctionComponent,
	useEffect,
	useCallback,
} from "react";
import { useHistory } from "react-router-dom";
import { AuthApiData } from "../interface/AuthApiData";
import { User } from "../interface/User";

interface IAuthContext {
	loggedInUser: User | null | undefined;
	updateLoginContext: (user: User) => void;
	logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
	loggedInUser: undefined,
	updateLoginContext: () => null,
	logout: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }) => {
	// default undefined before loading, once loaded provide user or null if logged out
	const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
	const history = useHistory();

	const updateLoginContext = useCallback(
		(user: User) => {
			setLoggedInUser(user);
			history.push("/dashboard");
		},
		[history]
	);

	const logout = async () => {
		// needed to remove token cookie
		await fetch("/logout");
		setLoggedInUser(null);
		localStorage.removeItem("token");
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
				.then((data: AuthApiData) => {
					if (data.success) {
						updateLoginContext(data.success.user);
					} else {
						// don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
						setLoggedInUser(null);
					}
				});
		};

		checkLoginWithCookies();
	}, [updateLoginContext]);

	return (
		<AuthContext.Provider
			value={{ loggedInUser, updateLoginContext, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	return useContext(AuthContext);
}
