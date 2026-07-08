import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";
import RegistrationForm from "../../src/pages/Login/RegistrationForm";

test("successful registration calls fetch with credentials", async () => {
	(globalThis.fetch as any) = vi
		.fn()
		.mockResolvedValue({ ok: true, json: async () => ({ id: 1 }) });

	render(
		<MemoryRouter>
			<RegistrationForm />
		</MemoryRouter>,
	);

	const email = "bob@example.com";
	const name = "Bob";
	const password = "Secret123!";

	await userEvent.type(screen.getByPlaceholderText(/email/i), email);
	await userEvent.type(screen.getByPlaceholderText(/name/i), name);
	await userEvent.type(screen.getByPlaceholderText(/password/i), password);
	await userEvent.click(screen.getByRole("button", { name: /register/i }));

	await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());

	const [url, opts] = (globalThis.fetch as any).mock.calls[0];
	expect(typeof url).toBe("string");
	expect(opts).toMatchObject({ method: "POST" });
	expect(JSON.parse(opts.body)).toEqual({ email, name, password });
});

test("valid email + invalid password shows password validation and does not call fetch", async () => {
	(globalThis.fetch as any) = vi
		.fn()
		.mockResolvedValue({ ok: true, json: async () => ({ id: 1 }) });

	render(
		<MemoryRouter>
			<RegistrationForm />
		</MemoryRouter>,
	);

	await userEvent.type(
		screen.getByPlaceholderText(/email/i),
		"alice@example.com",
	);
	await userEvent.type(screen.getByPlaceholderText(/name/i), "Alice");
	await userEvent.type(screen.getByPlaceholderText(/password/i), "short");
	await userEvent.click(screen.getByRole("button", { name: /register/i }));

	expect(
		await screen.findByText(
			/Password must be at least 8 characters|Password must contain/i,
		),
	).toBeInTheDocument();
	expect(globalThis.fetch).not.toHaveBeenCalled();
});

test("invalid email + valid password shows email validation and does not call fetch", async () => {
	(globalThis.fetch as any) = vi
		.fn()
		.mockResolvedValue({ ok: true, json: async () => ({ id: 1 }) });

	render(
		<MemoryRouter>
			<RegistrationForm />
		</MemoryRouter>,
	);

	await userEvent.type(screen.getByPlaceholderText(/email/i), "not-an-email");
	await userEvent.type(screen.getByPlaceholderText(/name/i), "Sam");
	await userEvent.type(screen.getByPlaceholderText(/password/i), "GoodPass1!");
	await userEvent.click(screen.getByRole("button", { name: /register/i }));

	expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
	expect(globalThis.fetch).not.toHaveBeenCalled();
});

test("both email and password invalid show both errors and do not call fetch", async () => {
	(globalThis.fetch as any) = vi
		.fn()
		.mockResolvedValue({ ok: true, json: async () => ({ id: 1 }) });

	render(
		<MemoryRouter>
			<RegistrationForm />
		</MemoryRouter>,
	);

	await userEvent.type(screen.getByPlaceholderText(/email/i), "bad");
	await userEvent.type(screen.getByPlaceholderText(/name/i), "X");
	await userEvent.type(screen.getByPlaceholderText(/password/i), "short");
	await userEvent.click(screen.getByRole("button", { name: /register/i }));

	expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
	expect(
		await screen.findByText(
			/Password must be at least 8 characters|Password must contain/i,
		),
	).toBeInTheDocument();
	expect(globalThis.fetch).not.toHaveBeenCalled();
});
