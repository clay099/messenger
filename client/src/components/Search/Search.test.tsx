import { render, fireEvent } from "@testing-library/react";
import Search from "./Search";
import MockChatProvider from "../../mocks/mockUseChatProvider";

const props = { search: "searching", handleChange: jest.fn() };

describe("Search tests", () => {
	test("smoke test", () => {
		render(<Search {...props} />);
	});

	test("loading snapshot test", () => {
		const { asFragment } = render(<Search {...props} />);
		expect(asFragment).toMatchSnapshot();
	});

	test("rendered messages snapshot test", () => {
		const { asFragment } = render(
			<MockChatProvider>
				<Search {...props} />
			</MockChatProvider>
		);
		expect(asFragment).toMatchSnapshot();
	});

	test("should display search input", () => {
		const { getByPlaceholderText } = render(
			<MockChatProvider>
				<Search {...props} />
			</MockChatProvider>
		);
		let input = getByPlaceholderText("Search") as HTMLInputElement;
		expect(input).toBeInTheDocument();
		expect(input.value).toBe(props.search);

		fireEvent.change(input, { target: { value: "update" } });
		expect(props.handleChange).toBeCalledWith(
			expect.anything(),
			"update",
			"input"
		);
	});
});
