import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";
import { AuthProvider } from "../../src/components/AuthContext";
import RegistrationForm from "../../src/pages/Login/RegistrationForm";

type VitestMock = ReturnType<typeof vi.fn>;

//if the AuthProvider needs to be rendered for the component to work, add the follwing code snippet:
/*
	// wait for the first Authprovider fetch and clear it
	await waitFor(() => expect(mockFetch).toHaveBeenCalled());
	mockFetch.mockClear();
*/

test("successful registration calls fetch with credentials", async () => {
	const mockFetch = vi.fn().mockResolvedValue({
		ok: true,
		json: async () => ({ token: "ok" }),
	}) as unknown as VitestMock;
	globalThis.fetch = mockFetch as unknown as typeof globalThis.fetch;

	render(
		<AuthProvider>
			<MemoryRouter>
				<RegistrationForm />
			</MemoryRouter>
		</AuthProvider>,
	);

	// wait for the first Authprovider fetch and clear it
	await waitFor(() => expect(mockFetch).toHaveBeenCalled());
	mockFetch.mockClear();

	const email = "bob@example.com";
	const name = "Bob";
	const password = "Secret123!";

	await userEvent.type(screen.getByPlaceholderText(/email/i), email);
	await userEvent.type(screen.getByPlaceholderText(/name/i), name);
	await userEvent.type(screen.getByPlaceholderText(/password/i), password);
	await userEvent.click(screen.getByRole("button", { name: /register/i }));

	await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());

	const [url, opts] = mockFetch.mock.calls[0] as [
		string,
		{ method?: string; body?: string },
	];
	expect(typeof url).toBe("string");
	expect(opts).toMatchObject({ method: "POST" });
	expect(JSON.parse(opts.body ?? "")).toEqual({ email, name, password });
});

test("valid email + invalid password shows password validation and does not call fetch", async () => {
	const mockFetch = vi.fn().mockResolvedValue({
		ok: true,
		json: async () => ({ token: "ok" }),
	}) as unknown as VitestMock;
	globalThis.fetch = mockFetch as unknown as typeof globalThis.fetch;

	render(
		<AuthProvider>
			<MemoryRouter>
				<RegistrationForm />
			</MemoryRouter>
		</AuthProvider>,
	);

	// wait for the first Authprovider fetch and clear it
	await waitFor(() => expect(mockFetch).toHaveBeenCalled());
	mockFetch.mockClear();

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
	const mockFetch = vi.fn().mockResolvedValue({
		ok: true,
		json: async () => ({ token: "ok" }),
	}) as unknown as VitestMock;
	globalThis.fetch = mockFetch as unknown as typeof globalThis.fetch;

	render(
		<AuthProvider>
			<MemoryRouter>
				<RegistrationForm />
			</MemoryRouter>
		</AuthProvider>,
	);

	// wait for the first Authprovider fetch and clear it
	await waitFor(() => expect(mockFetch).toHaveBeenCalled());
	mockFetch.mockClear();

	await userEvent.type(screen.getByPlaceholderText(/email/i), "not-an-email");
	await userEvent.type(screen.getByPlaceholderText(/name/i), "Sam");
	await userEvent.type(screen.getByPlaceholderText(/password/i), "GoodPass1!");
	await userEvent.click(screen.getByRole("button", { name: /register/i }));

	expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
	expect(globalThis.fetch).not.toHaveBeenCalled();
});

test("both email and password invalid show both errors and do not call fetch", async () => {
	const mockFetch = vi.fn().mockResolvedValue({
		ok: true,
		json: async () => ({ token: "ok" }),
	}) as unknown as VitestMock;
	globalThis.fetch = mockFetch as unknown as typeof globalThis.fetch;

	render(
		<AuthProvider>
			<MemoryRouter>
				<RegistrationForm />
			</MemoryRouter>
		</AuthProvider>,
	);

	// wait for the first Authprovider fetch and clear it
	await waitFor(() => expect(mockFetch).toHaveBeenCalled());
	mockFetch.mockClear();

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
