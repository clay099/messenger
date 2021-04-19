import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useSnackBar } from "../context/useSnackbarContext";
import { useAuth } from "../context/useAuthContext";
import { UserChat } from "../interface/UserChats";
import {
	SocketConnection,
	SocketNewMessage,
	SocketTypingStatus,
} from "../interface/Socket";
import { SentNewChatApiData } from "../interface/NewChatApiData";
import { newApiChatDataToUserChat } from "../helpers/newApiChatDataToUserChat";
import { Message } from "../interface/Message";

interface Props {
	handleNewChat: (newUserChat: UserChat) => void;
	userChats: UserChat[] | null;
	handleNewSocketMessage: (newMessage: Message) => void;
	userTyping: boolean;
	activeChat: UserChat | null | undefined;
	handleReceivedTyping: ({ email, chatId }: SocketTypingStatus) => void;
	handleReceivedStopTyping: ({ email, chatId }: SocketTypingStatus) => void;
}

export const useSocket = ({
	handleNewChat,
	userChats,
	handleNewSocketMessage,
	userTyping,
	activeChat,
	handleReceivedTyping,
	handleReceivedStopTyping,
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

	// useEffect(() => {
	// 	if (!socket && process.env.REACT_APP_API_URL) {
	// 		setSocket(
	// 			io(process.env.REACT_APP_API_URL, {
	// 				withCredentials: true,
	// 			})
	// 		);
	// 	}
	// }, [socket]);

	useEffect(() => {
		const disconnectCallback = () => {
			updateSnackBarMessage(
				"You have been disconnected from instant messages. We are trying to re-connect you."
			);
			setOnlineUsers(undefined);
		};

		if (socket) {
			socket.on("disconnect", disconnectCallback);
		}

		return () => {
			if (socket) {
				socket.off("disconnect", disconnectCallback);
			}
		};
	}, [socket, updateSnackBarMessage]);

	useEffect(() => {
		const reconnectCallback = (socket: Socket) => {
			updateSnackBarMessage(
				"You have been reconnected to instant messages."
			);
			socket.emit("reconnect", ({ onlineUsers }: SocketConnection) => {
				setOnlineUsers(new Set(onlineUsers));
			});
		};

		if (socket) {
			socket.on("reconnect", () => reconnectCallback(socket));
		}

		return () => {
			if (socket) {
				socket.off("reconnect", () => reconnectCallback(socket));
			}
		};
	}, [socket, updateSnackBarMessage]);

	useEffect(() => {
		const userJoinedCallback = ({ onlineUsers }: SocketConnection) => {
			setOnlineUsers(new Set(onlineUsers));
		};

		if (socket) {
			socket.on("user joined", userJoinedCallback);
		}

		return () => {
			if (socket) {
				socket.off("user joined", userJoinedCallback);
			}
		};
	}, [socket]);

	useEffect(() => {
		const reconnectErrorCallback = () => {
			updateSnackBarMessage("Attempt to reconnect has failed.");
		};

		if (socket) {
			socket.on("reconnect_error", reconnectErrorCallback);
		}

		return () => {
			if (socket) {
				socket.off("reconnect_error", reconnectErrorCallback);
			}
		};
	}, [socket, updateSnackBarMessage]);

	useEffect(() => {
		const userLeftCallback = ({ onlineUsers }: SocketConnection) => {
			setOnlineUsers(new Set(onlineUsers));
		};

		if (socket) {
			socket.on("user left", userLeftCallback);
		}

		return () => {
			if (socket) {
				socket.off("user left", userLeftCallback);
			}
		};
	}, [socket]);

	useEffect(() => {
		const connectionErrorCallback = (err: Error) => {
			updateSnackBarMessage(err.message);
		};

		if (socket) {
			// handle errors especially  middleware error
			socket.on("connect_error", connectionErrorCallback);
		}

		return () => {
			if (socket) {
				socket.off("connect_error", connectionErrorCallback);
			}
		};
	}, [socket, updateSnackBarMessage]);

	useEffect(() => {
		const newMessageCallback = ({ message }: SocketNewMessage) => {
			handleNewSocketMessage(message);
		};

		if (socket) {
			// This is only broadcast to users that have a new message with a chat they are involved with. If we receive this it means one of our chats needs to be updated
			socket.on("new message", newMessageCallback);
		}

		return () => {
			if (socket) {
				socket.off("new message", newMessageCallback);
			}
		};
	}, [socket, handleNewSocketMessage]);

	useEffect(() => {
		const newChatCallback = ({ chat, users }: SentNewChatApiData) => {
			// save the data
			if (loggedInUser) {
				const userChatData = newApiChatDataToUserChat({
					data: { chat, users },
					loggedInUserEmail: loggedInUser.email,
				});
				handleNewChat(userChatData);
			}
		};

		if (socket) {
			// if you are logged in and you create a new chat or another party creates a chat with you. Save that chat data to avoid a logged in user trying to create a new room which already exists and receiving an error message
			socket.on("new chat", newChatCallback);
		}

		return () => {
			if (socket) {
				socket.off("new chat", newChatCallback);
			}
		};
	}, [socket, loggedInUser, handleNewChat]);

	useEffect(() => {
		if (socket) {
			if (loggedInUser && activeChat) {
				if (userTyping) {
					socket.emit(
						"user typing",
						activeChat.chatId,
						loggedInUser.email
					);
				}
			}
		}

		// clean up if user was typing send a message that they stopped
		return () => {
			if (socket) {
				if (loggedInUser && activeChat) {
					if (userTyping) {
						socket.emit(
							"user stopped typing",
							activeChat.chatId,
							loggedInUser.email
						);
					}
				}
			}
		};
	}, [socket, activeChat, loggedInUser, userTyping]);

	useEffect(() => {
		if (socket) {
			socket.on("started typing", handleReceivedTyping);
		}

		return () => {
			if (socket) {
				socket.off("started typing", handleReceivedTyping);
			}
		};
	}, [socket, handleReceivedTyping]);

	useEffect(() => {
		if (socket) {
			socket.on("stopped typing", handleReceivedStopTyping);
		}

		return () => {
			if (socket) {
				socket.off("stopped typing", handleReceivedStopTyping);
			}
		};
	}, [socket, handleReceivedStopTyping]);

	return { onlineUsers };
};
