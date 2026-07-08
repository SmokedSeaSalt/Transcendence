import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from "../../src/pages/Login/LoginForm"
import { MemoryRouter } from 'react-router-dom';
import { test, expect, vi } from 'vitest';

test('shows validation and calls fetch with credentials', async () => {
	// configure the fetch mock created in vitest.setup.ts. This ensures that the fetch in useLogin is mocked and does not call the backend
	(globalThis.fetch as any) = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ token: 'ok' }) });

	render(<MemoryRouter><LoginForm /></MemoryRouter>);

	// trigger validation error with empty input
	await userEvent.click(screen.getByRole('button', { name: /login/i }));
	const alerts = await screen.findAllByRole('alert');
	expect(alerts.length).toBeGreaterThan(0);

	const email = 'alice@example.com'
	const password = 'secreT123!'
	// fill and submit
	await userEvent.type(screen.getByPlaceholderText(/email/i), email);
	await userEvent.type(screen.getByPlaceholderText(/password/i), password);
	await userEvent.click(screen.getByRole('button', { name: /login/i }));

	await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());

	// inspect fetch args (URL and request options)
	const [url, opts] = (globalThis.fetch as any).mock.calls[0];
	expect(typeof url).toBe('string');
	expect(opts).toMatchObject({ method: 'POST' });
	expect(JSON.parse(opts.body)).toEqual({ email: email, password: password });
});


test('valid email + empty password and does not call fetch', async () => {
	(globalThis.fetch as any) = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ token: 'ok' }) });

	render(<MemoryRouter><LoginForm /></MemoryRouter>);

	await userEvent.type(screen.getByPlaceholderText(/email/i), 'alice@example.com');
	await userEvent.click(screen.getByRole('button', { name: /login/i }));

	expect(await screen.findByText(/Password cannot be empty/i)).toBeInTheDocument();
	expect(globalThis.fetch).not.toHaveBeenCalled();
});

test('invalid email + valid password shows email validation and does not call fetch', async () => {
	(globalThis.fetch as any) = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ token: 'ok' }) });

	render(<MemoryRouter><LoginForm /></MemoryRouter>);

	await userEvent.type(screen.getByPlaceholderText(/email/i), 'not-an-email');
	await userEvent.type(screen.getByPlaceholderText(/password/i), 'GoodPass1!');
	await userEvent.click(screen.getByRole('button', { name: /login/i }));

	expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
	expect(globalThis.fetch).not.toHaveBeenCalled();
});

test('both email and password invalid show both errors and do not call fetch', async () => {
	(globalThis.fetch as any) = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ token: 'ok' }) });

	render(<MemoryRouter><LoginForm /></MemoryRouter>);

	await userEvent.type(screen.getByPlaceholderText(/email/i), 'bad');
	await userEvent.click(screen.getByRole('button', { name: /login/i }));

	expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
	expect(await screen.findByText(/Password cannot be empty/i)).toBeInTheDocument();
	expect(globalThis.fetch).not.toHaveBeenCalled();
});