import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import GamePageHeader from "../../src/pages/GamePage/GamePageHeader";
import { SocketProvider } from "../../src/pages/GamePage/SocketContext";

// todo: add more tests when room connection is functional

test("click join room and open field", async () => {
	render(
		<SocketProvider>
			<GamePageHeader />
		</SocketProvider>,
	);

	// clicking should open connect pop-up
	await userEvent.click(screen.getByRole("button", { name: "Join room" }));
	expect(await screen.findByText(/Connect/i)).toBeInTheDocument();
});

test("empty input", async () => {
	render(
		<SocketProvider>
			<GamePageHeader />
		</SocketProvider>,
	);
	await userEvent.click(screen.getByRole("button", { name: "Join room" }));
	await userEvent.click(screen.getByRole("button", { name: "Connect" }));
	expect(await screen.findByText(/Room ID is six digits/i)).toBeInTheDocument();
});

test("wrong amount of numbers", async () => {
	render(
		<SocketProvider>
			<GamePageHeader />
		</SocketProvider>,
	);
	await userEvent.click(screen.getByRole("button", { name: "Join room" }));
	const room_id = "1234567";
	await userEvent.type(screen.getByPlaceholderText(/Room ID/i), room_id);
	await userEvent.click(screen.getByRole("button", { name: "Connect" }));
	expect(await screen.findByText(/Room ID is six digits/i)).toBeInTheDocument();
});

test("wrong characters", async () => {
	render(
		<SocketProvider>
			<GamePageHeader />
		</SocketProvider>,
	);
	await userEvent.click(screen.getByRole("button", { name: "Join room" }));
	const room_id = "abcdef";
	await userEvent.type(screen.getByPlaceholderText(/Room ID/i), room_id);
	await userEvent.click(screen.getByRole("button", { name: "Connect" }));
	expect(
		await screen.findByText(/Room ID is a six digit number/i),
	).toBeInTheDocument();
});
