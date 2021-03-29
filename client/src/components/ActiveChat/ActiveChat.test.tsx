import { render } from "@testing-library/react";
import ActiveChat from "./ActiveChat";
import MockChatProvider from "../../mocks/mockUseChatProvider";
import mockChatMessages from "../../mocks/mockChatMessages";

describe("ActiveChat tests", () => {
	test("smoke test", () => {
		render(<ActiveChat />);
	});

	test("loading snapshot test", () => {
		const { asFragment } = render(<ActiveChat />);
		expect(asFragment).toMatchSnapshot();
	});

	test("should have loading screen", () => {
		const { getByText } = render(<ActiveChat />);
		expect(getByText("Loading...")).toBeInTheDocument();
	});

	test("rendered messages snapshot test", () => {
		const { asFragment } = render(
			<MockChatProvider>
				<ActiveChat />
			</MockChatProvider>
		);
		expect(asFragment).toMatchSnapshot();
	});

	test("should display all chat messages", () => {
		const { getByText } = render(
			<MockChatProvider>
				<ActiveChat />
			</MockChatProvider>
		);
		mockChatMessages.forEach((message) => {
			expect(getByText(message.content)).toBeInTheDocument();
		});
	});
});
