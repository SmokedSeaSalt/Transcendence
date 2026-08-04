import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { redirect } from "react-router-dom";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import UserStats from "../../src/pages/Profile/UserStats";
import { getUserStats } from "../../src/pages/Profile/getUserStats";

type VitestMock = ReturnType<typeof vi.fn>;

test("stats when logged out", async () => {
	render(<UserStats />);

	expect(await screen.findByText("No stats")).toBeInTheDocument();
});

test("stats when logged in", async () => {
	const mockStats = {
		max_wpm: 47,
		max_cpm: 380,
		max_accuracy: 0,
		average_wpm: 44,
		average_cpm: 363,
		average_accuracy: 0,
		wins: 3,
		total_games: 3,
	};

	const mockFetch = vi.fn().mockResolvedValue({
		ok: true,
		json: async () => mockStats,
	}) as unknown as VitestMock;
	globalThis.fetch = mockFetch as unknown as typeof globalThis.fetch;

	render(<UserStats />);

	expect(await screen.findByText("Games won: 3")).toBeInTheDocument();
	expect(await screen.findByText("Games played: 3")).toBeInTheDocument();
	expect(await screen.findByText("Max wpm: 47")).toBeInTheDocument();
	expect(await screen.findByText("Average wpm: 44")).toBeInTheDocument();

	mockFetch.mockClear();
});
