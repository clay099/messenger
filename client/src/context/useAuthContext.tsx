import {
	useState,
	useContext,
	createContext,
	FunctionComponent,
	useEffect,
	useCallback,
} from "react";
import { useHistory } from "react-router-dom";
import { User } from "../interface/User";
import { mockLoggedInUser } from "../mocks/mockUser";

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

	const logout = () => {
		setLoggedInUser(null);
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
					//TODO: upon connection, get this from backend and delete mockLoggedInUser variable
					updateLoginContext(mockLoggedInUser);
				})
				.catch((error) => {
					// think we should be able to ignore error, if we can't login we don't care about error
					console.log({ error });

					// remove this line, only used for testing dashboard
					setLoggedInUser(mockLoggedInUser);
					// add in following line. only commented out for testing dashboard
					// setLoggedInUser(null);
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
