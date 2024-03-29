import { render, fireEvent } from "@testing-library/react";
import ChatSideBanner from "./ChatSideBanner";
import { mockLoggedInUser } from "../../mocks/mockUser";
import mockChats from "../../mocks/mockChats";
import MockChatProvider from "../../mocks/mockUseChatProvider";

describe("ChatSideBanner tests", () => {
	test("smoke test", () => {
		render(<ChatSideBanner loggedInUser={mockLoggedInUser} />);
	});

	test("loading snapshot test", () => {
		const { asFragment } = render(
			<ChatSideBanner loggedInUser={mockLoggedInUser} />
		);
		expect(asFragment).toMatchSnapshot();
	});

	test("should display sidebar data", () => {
		const { getByText, queryByText, getByPlaceholderText } = render(
			<MockChatProvider>
				<ChatSideBanner loggedInUser={mockLoggedInUser} />
			</MockChatProvider>
		);

		expect(getByText(mockLoggedInUser.username)).toBeInTheDocument();
		expect(getByText("Chats")).toBeInTheDocument();
		let input = getByPlaceholderText("Search") as HTMLInputElement;
		expect(input).toBeInTheDocument();
		fireEvent.change(input, { target: { value: "test" } });
		expect(input.value).toBe("test");

		mockChats.forEach((chat) => {
			expect(getByText(chat.User.username)).toBeInTheDocument();
			chat.lastMessage &&
				expect(getByText(chat.lastMessage)).toBeInTheDocument();
		});

		// should match only one user and show only their data all other users should not be present
		fireEvent.change(input, { target: { value: "1" } });
		mockChats.forEach((chat, idx) => {
			if (idx === 0) {
				expect(getByText(chat.User.username)).toBeInTheDocument();
				chat.lastMessage &&
					expect(getByText(chat.lastMessage)).toBeInTheDocument();
			} else {
				expect(queryByText(chat.User.username)).not.toBeInTheDocument();
				chat.lastMessage &&
					expect(
						queryByText(chat.lastMessage)
					).not.toBeInTheDocument();
			}
		});

		// should not match any users and thus not show any chats
		fireEvent.change(input, { target: { value: "updated" } });
		mockChats.forEach((chat) => {
			expect(queryByText(chat.User.username)).not.toBeInTheDocument();
			chat.lastMessage &&
				expect(queryByText(chat.lastMessage)).not.toBeInTheDocument();
		});
	});
});
