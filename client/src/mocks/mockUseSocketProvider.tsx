import { FunctionComponent } from "react";
import { SocketContext } from "../context/useSocketContext";
import { mockOtherUsers } from "./mockUser";

const MockUseSocketProvider: FunctionComponent = ({ children }) => {
	return (
		<SocketContext.Provider
			value={{
				joinChatRooms: jest.fn(),
				onlineUsers: new Set([
					mockOtherUsers[0].email,
					mockOtherUsers[1].email,
				]),
				updatedUserChatLastMessage: null,
				resetUpdatedUserChatLastMessage: jest.fn(),
				newUserChat: null,
				resetNewUserChat: jest.fn(),
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export default MockUseSocketProvider;
