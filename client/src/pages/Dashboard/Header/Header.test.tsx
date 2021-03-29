import { render, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header tests", () => {
	test("smoke test", () => {
		render(<Header />);
	});

	test("loading snapshot test", () => {
		const { asFragment } = render(<Header />);
		expect(asFragment).toMatchSnapshot();
	});

	test("rendered messages snapshot test", () => {
		const { asFragment } = render(<Header />);
		expect(asFragment).toMatchSnapshot();
	});

	test("should have form input to send a new message", () => {
		const { getByText, getByTestId } = render(<Header />);
		expect(getByText("Online")).toBeInTheDocument();
		expect(getByTestId("inline-badge-element")).toBeInTheDocument();
	});
});
