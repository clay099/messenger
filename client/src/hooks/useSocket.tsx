import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useSnackBar } from "../context/useSnackbarContext";
import { useAuth } from "../context/useAuthContext";
import { UserChat } from "../interface/UserChats";
import { SocketConnection, SocketNewMessage } from "../interface/Socket";
import { SentNewChatApiData } from "../interface/NewChatApiData";
import { newApiChatDataToUserChat } from "../helpers/newApiChatDataToUserChat";
import { Message } from "../interface/Message";

interface Props {
	handleNewChat: (newUserChat: UserChat) => void;
	userChats: UserChat[] | null;
	handleNewSocketMessage: (newMessage: Message) => void;
}

export const useSocket = ({
	handleNewChat,
	userChats,
	handleNewSocketMessage,
}: Props) => {
	const [onlineUsers, setOnlineUsers] = useState<Set<string> | undefined>();
	const [socket, setSocket] = useState<Socket | null>(null);

	const { updateSnackBarMessage } = useSnackBar();
	const { loggedInUser } = useAuth();

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

	const handleJoinChatRooms = useCallback(
		(userChats: UserChat[]) => {
			if (socket) {
				const chatRoomIds = userChats.map((chat) => chat.chatId);
				socket.emit("join chatRooms", chatRoomIds);
			}
		},
		[socket]
	);

	useEffect(() => {
		if (userChats) {
			handleJoinChatRooms(userChats);
		}
	}, [userChats, handleJoinChatRooms]);

	useEffect(() => {
		if (!socket && process.env.REACT_APP_API_URL) {
			setSocket(
				io(process.env.REACT_APP_API_URL, {
					withCredentials: true,
				})
			);
		} else if (socket && loggedInUser) {
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
			socket.on("new message", ({ message }: SocketNewMessage) => {
				handleNewSocketMessage(message);
			});

			// handle errors especially  middleware error
			socket.on("connect_error", (err) => {
				updateSnackBarMessage(err.message);
			});

			// if you are logged in and you create a new chat or another party creates a chat with you. Save that chat data to avoid a logged in user trying to create a new room which already exists and receiving an error message
			socket.on("new chat", ({ chat, users }: SentNewChatApiData) => {
				// save the data
				const userChatData = newApiChatDataToUserChat({
					data: { chat, users },
					loggedInUserEmail: loggedInUser.email,
				});
				handleNewChat(userChatData);
			});
		}
	}, [
		socket,
		handleNewChat,
		handleNewSocketMessage,
		loggedInUser,
		updateSnackBarMessage,
	]);
	return { onlineUsers };
};
