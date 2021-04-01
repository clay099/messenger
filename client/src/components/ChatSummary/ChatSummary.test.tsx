import { render } from "@testing-library/react";
import ChatSummary from "./ChatSummary";
import MockChatProvider from "../../mocks/mockUseChatProvider";
import mockChats from "../../mocks/mockChats";

describe("ChatSummary tests", () => {
	test("smoke test", () => {
		render(<ChatSummary chat={mockChats[0]} />);
	});

	test("loading snapshot test", () => {
		const { asFragment } = render(<ChatSummary chat={mockChats[0]} />);
		expect(asFragment).toMatchSnapshot();
	});

	test("rendered messages snapshot test", () => {
		const { asFragment } = render(
			<MockChatProvider>
				<ChatSummary chat={mockChats[0]} />
			</MockChatProvider>
		);
		expect(asFragment).toMatchSnapshot();
	});

	test("should display all chat messages", () => {
		const { getByText } = render(
			<MockChatProvider>
				<ChatSummary chat={mockChats[0]} />
			</MockChatProvider>
		);
		expect(getByText(mockChats[0].user.username)).toBeInTheDocument();
		expect(getByText(mockChats[0].lastMessage.message)).toBeInTheDocument();
	});
});
