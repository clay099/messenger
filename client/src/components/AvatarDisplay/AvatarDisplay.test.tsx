import { render } from "@testing-library/react";
import AvatarDisplay from "./AvatarDisplay";

describe("AvatarDisplay tests", () => {
	test("smoke test", () => {
		render(<AvatarDisplay loggedIn />);
	});

	test("loading snapshot test", () => {
		const { asFragment } = render(<AvatarDisplay loggedIn />);
		expect(asFragment).toMatchSnapshot();
	});

	test("should display avatar ", () => {
		const { getByTestId } = render(<AvatarDisplay loggedIn />);

		expect(getByTestId("avatar-badge-element")).toBeInTheDocument();
	});
});
