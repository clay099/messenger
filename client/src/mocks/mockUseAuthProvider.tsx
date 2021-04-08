import { FunctionComponent } from "react";
import { AuthContext } from "../context/useAuthContext";
import { mockLoggedInUser, mockOtherUsers } from "./mockUser";

const MockUseAuthProvider: FunctionComponent = ({ children }) => {
	return (
		<AuthContext.Provider
			value={{
				loggedInUser: mockLoggedInUser,
				updateLoginContext: jest.fn(),
				logout: jest.fn(),
				onlineUsers: new Set([
					mockOtherUsers[0].email,
					mockOtherUsers[1].email,
				]),
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default MockUseAuthProvider;
