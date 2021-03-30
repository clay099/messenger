import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";
import MockChatProvider from "../../mocks/mockUseChatProvider";
import MockAuthProvider from "../../mocks/mockUseAuthProvider";
import mockChats from "../../mocks/mockChats";

jest.mock("../../hooks/useGetChats", () => {
	return () => mockChats;
});

describe("Dashboard tests", () => {
	test("smoke test", () => {
		render(
			<MockAuthProvider>
				<MockChatProvider>
					<Dashboard />
				</MockChatProvider>
			</MockAuthProvider>
		);
	});

	test("loading snapshot test", () => {
		const { asFragment } = render(
			<MockAuthProvider>
				<MockChatProvider>
					<Dashboard />
				</MockChatProvider>
			</MockAuthProvider>
		);
		expect(asFragment).toMatchSnapshot();
	});

	test("rendered messages snapshot test", () => {
		const { asFragment } = render(
			<MockAuthProvider>
				<MockChatProvider>
					<Dashboard />
				</MockChatProvider>
			</MockAuthProvider>
		);
		expect(asFragment).toMatchSnapshot();
	});

	test("should have loading when waiting for auth provide to check if loggedIn", () => {
		const { getByText } = render(
			<MockChatProvider>
				<Dashboard />
			</MockChatProvider>
		);
		expect(getByText("Loading...")).toBeInTheDocument();
	});

	test("should have loading when waiting for auth provide to check if loggedIn", async () => {
		const { getAllByText, getByPlaceholderText } = render(
			<MockAuthProvider>
				<MockChatProvider>
					<Dashboard />
				</MockChatProvider>
			</MockAuthProvider>
		);
		// expect two as we render twice for mobile and desktop as referenced in material UI documents
		expect(getAllByText("Chats")).toHaveLength(2);
		expect(getByPlaceholderText("Type something...")).toBeInTheDocument();
	});
});
