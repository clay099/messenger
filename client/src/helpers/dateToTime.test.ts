import { dateToTime } from "./dateToTime";

describe("dateToTime Test", () => {
	test("should format seconds", () => {
		const time = new Date();
		time.setSeconds(time.getSeconds() - 2);
		const timeString = time.toString();
		expect(dateToTime(timeString)).toBe("2 seconds ago");
	});
	test("should format minutes", () => {
		const time = new Date();
		time.setMinutes(time.getMinutes() - 2);
		const timeString = time.toString();
		expect(dateToTime(timeString)).toBe("2 minutes ago");
	});
	test("should format hours", () => {
		const time = new Date();
		time.setHours(time.getHours() - 2);
		const timeString = time.toString();
		expect(dateToTime(timeString)).toBe("2 hours ago");
	});
	test("should format days", () => {
		const time = new Date();
		time.setHours(time.getHours() - 24 * 2);
		const timeString = time.toString();
		expect(dateToTime(timeString)).toBe("2 days ago");
	});
	test("should format one weeks", () => {
		const time = new Date();
		time.setHours(time.getHours() - 24 * 7);
		const timeString = time.toString();
		expect(dateToTime(timeString)).toBe("last week");
	});
	test("should format multiple weeks", () => {
		const time = new Date();
		time.setHours(time.getHours() - 24 * 7 * 2);
		const timeString = time.toString();
		expect(dateToTime(timeString)).toBe("2 weeks ago");
	});
	test("should format years", () => {
		const time = new Date();
		time.setHours(time.getHours() - 24 * 7 * 53);
		const timeString = time.toString();
		expect(dateToTime(timeString)).toBe("last year");
	});
});
