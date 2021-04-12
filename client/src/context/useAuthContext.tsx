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
import { io, Socket } from "socket.io-client";
import { useSnackBar } from "./useSnackbarContext";

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
	const [socket, setSocket] = useState<Socket | null>(null);
	const history = useHistory();
	const { updateSnackBarMessage } = useSnackBar();

	const socketLogin = useCallback(
		(user: User) => {
			if (socket) {
				// if last argument of emit is a function it is a callback which will be called once the other side acknowledges the event
				socket.emit(
					"log in",
					user,
					({ onlineUsers }: { onlineUsers: string[] }) => {
						setOnlineUsers(new Set(onlineUsers));
					}
				);
			}
		},
		[socket]
	);

	const updateLoginContext = useCallback(
		(data: AuthApiDataSuccess) => {
			setLoggedInUser(data.user);
			socketLogin(data.user);
			history.push("/dashboard");
		},
		[history, socketLogin]
	);

	const logout = useCallback(async () => {
		// needed to remove token cookie
		await fetch("/logout")
			.then(() => {
				history.push("/login");
				setLoggedInUser(null);
				setOnlineUsers(undefined);
			})
			.catch((error) => console.error(error));
	}, [history]);

	useEffect(() => {
		if (!socket) {
			process.env.REACT_APP_API_URL &&
				setSocket(io(process.env.REACT_APP_API_URL));
		} else {
			socket.on("connect", () => {
				// used to catch the situation there is a loggedInUser but there was a delay establishing the socket connection and the updateLoginContext did not run the socketLogin function
				if (loggedInUser && !onlineUsers) {
					socketLogin(loggedInUser);
				}
			});
			socket.on("disconnect", () => {
				updateSnackBarMessage(
					"You have been disconnected from instant messages. We are trying to re-connect you"
				);
				onlineUsers && setOnlineUsers(undefined);
			});

			socket.on("reconnect", () => {
				updateSnackBarMessage("You have been reconnected");
				if (loggedInUser) {
					socketLogin(loggedInUser);
				}
			});

			socket.on("reconnect_error", () => {
				updateSnackBarMessage("Attempt to reconnect has failed");
			});
		}
	}, [
		socket,
		loggedInUser,
		logout,
		onlineUsers,
		updateSnackBarMessage,
		socketLogin,
	]);

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
