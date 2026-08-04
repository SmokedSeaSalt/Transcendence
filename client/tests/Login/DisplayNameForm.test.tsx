import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";
import DisplayNameForm from "../../src/pages/Login/DisplayNameForm.tsx";

// const getItemSpy = vi.spyOn(Storage.prototype, "getItem"); // for if we want tests where we set a value
const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

afterEach(() => {
	// getItemSpy.mockClear();
	setItemSpy.mockClear();
	localStorage.clear();
});

test("empty display name", async () => {
	render(<DisplayNameForm />);

	// trigger validation error with empty input
	await userEvent.click(
		screen.getByRole("button", { name: "Set display name" }),
	);
	const alerts = await screen.findAllByRole("alert");
	expect(alerts.length).toBeGreaterThan(0);
	expect(setItemSpy).not.toHaveBeenCalled();
});

test("valid display name", async () => {
	render(<DisplayNameForm />);
	const name = "valid_username";
	// fill and submit
	await userEvent.type(screen.getByPlaceholderText(/display name/i), name);
	await userEvent.click(
		screen.getByRole("button", { name: "Set display name" }),
	);
	expect(
		await screen.findByText(/Name set successfully!/i),
	).toBeInTheDocument();
	expect(setItemSpy).toHaveBeenCalledWith("display_name", name);
});

test("too long display name", async () => {
	render(<DisplayNameForm />);
	const name =
		"0123456789_0123456789_0123456789_0123456789_0123456789_0123456789_0123456789_0123456789_0123456789_0123456789_0123456789";
	// trigger validation error with too long input
	await userEvent.type(screen.getByPlaceholderText(/display name/i), name);
	await userEvent.click(
		screen.getByRole("button", { name: "Set display name" }),
	);
	const alerts = await screen.findAllByRole("alert");
	expect(alerts.length).toBeLessThan(100);
	expect(setItemSpy).not.toHaveBeenCalled();
});

test("invalid characters display name", async () => {
	render(<DisplayNameForm />);
	const name = "name!";
	// trigger invalid characters
	await userEvent.type(screen.getByPlaceholderText(/display name/i), name);
	await userEvent.click(
		screen.getByRole("button", { name: "Set display name" }),
	);
	expect(
		await screen.findByText(
			/Name can only contain letters, numbers, underscores and dashes/i,
		),
	).toBeInTheDocument();
	expect(setItemSpy).not.toHaveBeenCalled();
});
