import {
	useState,
	useContext,
	createContext,
	FunctionComponent,
	useEffect,
	useCallback,
} from "react";
import { io, Socket } from "socket.io-client";
import { useSnackBar } from "./useSnackbarContext";
import { useAuth } from "./useAuthContext";
import { UserChat } from "../interface/UserChats";
import { SocketConnection, SocketNewMessage } from "../interface/Socket";
import { SentNewChatApiData } from "../interface/NewChatApiData";
import { newApiChatDataToUserChat } from "../helpers/newApiChatDataToUserChat";

interface ISocketContext {
	joinChatRooms: (userChats: UserChat[]) => void;
	onlineUsers: Set<string> | undefined;
	updatedUserChatLastMessage: null | SocketNewMessage;
	resetUpdatedUserChatLastMessage: () => void;
	newUserChat: UserChat | null;
	resetNewUserChat: () => void;
}

export const SocketContext = createContext<ISocketContext>({
	joinChatRooms: () => null,
	onlineUsers: undefined,
	updatedUserChatLastMessage: null,
	resetUpdatedUserChatLastMessage: () => null,
	newUserChat: null,
	resetNewUserChat: () => null,
});

export const SocketProvider: FunctionComponent = ({ children }) => {
	const [onlineUsers, setOnlineUsers] = useState<Set<string> | undefined>();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [
		updatedUserChatLastMessage,
		setUpdatedUserChatLastMessage,
	] = useState<null | SocketNewMessage>(null);
	const [newUserChat, setNewUserChat] = useState<UserChat | null>(null);

	const { updateSnackBarMessage } = useSnackBar();
	const { loggedInUser, socketToken } = useAuth();

	useEffect(() => {
		if (socket) {
			// if last argument of emit is a function it is a callback which will be called once the other side acknowledges the event
			socket.emit("log in", ({ onlineUsers }: SocketConnection) => {
				setOnlineUsers(new Set(onlineUsers));
			});
		}
		// when the provider is removed tell the socket that you logged out
		return () => {
			if (socket) {
				socket.emit("log out");
			}
		};
	}, [socket]);

	const joinChatRooms = useCallback(
		(userChats: UserChat[]) => {
			if (socket) {
				const chatRoomIds = userChats.map((chat) => chat.chatId);
				socket.emit("join chatRooms", chatRoomIds);
			}
		},
		[socket]
	);

	useEffect(() => {
		if (!socket && socketToken && process.env.REACT_APP_API_URL) {
			setSocket(
				io(process.env.REACT_APP_API_URL, {
					auth: { token: socketToken },
				})
			);
		} else if (socket) {
			socket.on("disconnect", () => {
				updateSnackBarMessage(
					"You have been disconnected from instant messages. We are trying to re-connect you."
				);
				setOnlineUsers(undefined);
			});

			socket.on("reconnect", () => {
				updateSnackBarMessage(
					"You have been reconnected to instant messages."
				);
				socket.emit(
					"reconnect",
					({ onlineUsers }: SocketConnection) => {
						setOnlineUsers(new Set(onlineUsers));
					}
				);
			});

			socket.on("user joined", ({ onlineUsers }: SocketConnection) => {
				setOnlineUsers(new Set(onlineUsers));
			});

			socket.on("reconnect_error", () => {
				updateSnackBarMessage("Attempt to reconnect has failed.");
			});

			socket.on("user left", ({ onlineUsers }: SocketConnection) => {
				setOnlineUsers(new Set(onlineUsers));
			});

			// This is only broadcast to users that have a new message with a chat they are involved with. If we receive this it means one of our chats needs to be updated
			console.log("use effect running");
			socket.on("new message", ({ message }: SocketNewMessage) => {
				setUpdatedUserChatLastMessage({ message });
			});

			// if you are logged in (should be the case unless this provider is used outside Dashboard Component) and you create a new chat or another party creates a chat with you. Save that chat data to avoid a logged in user trying to create a new room which already exists and receiving an error message
			if (loggedInUser) {
				socket.on("new chat", ({ chat, users }: SentNewChatApiData) => {
					// save the data
					const userChatData = newApiChatDataToUserChat({
						data: { chat, users },
						loggedInUserEmail: loggedInUser.email,
					});
					setNewUserChat(userChatData);
				});
			}
		}
	}, [socket, socketToken, loggedInUser, updateSnackBarMessage]);

	const resetUpdatedUserChatLastMessage = useCallback(() => {
		setUpdatedUserChatLastMessage(null);
	}, []);

	const resetNewUserChat = useCallback(() => {
		setNewUserChat(null);
	}, []);

	return (
		<SocketContext.Provider
			value={{
				onlineUsers,
				joinChatRooms,
				updatedUserChatLastMessage,
				resetUpdatedUserChatLastMessage,
				newUserChat,
				resetNewUserChat,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export function useSocket() {
	return useContext(SocketContext);
}
