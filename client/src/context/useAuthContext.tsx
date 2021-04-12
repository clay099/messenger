import {
	useState,
	useContext,
	createContext,
	FunctionComponent,
	useEffect,
	useCallback,
} from "react";
import { useHistory } from "react-router-dom";
import { AuthApiData, AuthApiDataSuccess } from "../interface/AuthApiData";
import { User } from "../interface/User";
import loginWithCookies from "../helpers/APICalls/loginWithCookies";

interface IAuthContext {
	loggedInUser: User | null | undefined;
	updateLoginContext: (data: AuthApiDataSuccess) => void;
	logout: () => void;
	onlineUsers: Set<string> | undefined;
}

export const AuthContext = createContext<IAuthContext>({
	loggedInUser: undefined,
	updateLoginContext: () => null,
	logout: () => null,
	onlineUsers: undefined,
});

export const AuthProvider: FunctionComponent = ({ children }) => {
	// default undefined before loading, once loaded provide user or null if logged out
	const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
	//TODO: when socket IO is connected add function to remove users when advised by connection
	const [onlineUsers, setOnlineUsers] = useState<Set<string> | undefined>();
	const history = useHistory();

	const updateLoginContext = useCallback(
		(data: AuthApiDataSuccess) => {
			setLoggedInUser(data.user);
			setOnlineUsers((state) => {
				if (!state) {
					return new Set(data.onlineUsers);
				} else {
					return new Set([...state, ...data.onlineUsers]);
				}
			});
			history.push("/dashboard");
		},
		[history]
	);

	const logout = async () => {
		// needed to remove token cookie
		await fetch("/logout")
			.then(() => {
				history.push("/login");
				setLoggedInUser(null);
				setOnlineUsers(undefined);
			})
			.catch((error) => console.error(error));
	};

	// use our cookies to check if we can login straight away
	useEffect(() => {
		const checkLoginWithCookies = async () => {
			await loginWithCookies().then((data: AuthApiData) => {
				if (data.success) {
					updateLoginContext(data.success);
				} else {
					// don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
					setLoggedInUser(null);
					history.push("/login");
				}
			});
		};
		checkLoginWithCookies();
	}, [updateLoginContext, history]);

	return (
		<AuthContext.Provider
			value={{ loggedInUser, updateLoginContext, logout, onlineUsers }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	return useContext(AuthContext);
}
