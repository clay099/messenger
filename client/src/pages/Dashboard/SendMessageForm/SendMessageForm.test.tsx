import { render, fireEvent } from "@testing-library/react";
import SendMessageForm from "./SendMessageForm";

describe("SendMessageForm tests", () => {
	test("smoke test", () => {
		render(<SendMessageForm />);
	});

	test("loading snapshot test", () => {
		const { asFragment } = render(<SendMessageForm />);
		expect(asFragment).toMatchSnapshot();
	});

	test("rendered messages snapshot test", () => {
		const { asFragment } = render(<SendMessageForm />);
		expect(asFragment).toMatchSnapshot();
	});

	test("should have form input to send a new message", () => {
		const { getByPlaceholderText } = render(<SendMessageForm />);
		const input = getByPlaceholderText(
			"Type something..."
		) as HTMLInputElement;
		expect(input).toBeInTheDocument();
		fireEvent.change(input, { target: { value: "updated input" } });
		expect(input.value).toBe("updated input");
	});
});
