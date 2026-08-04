import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import GameHistory from "../../src/pages/Profile/GameHistory";
import getGameHistory from "../../src/pages/Profile/getGameHistory";
import type { jsonGameHistory } from "../../src/pages/Profile/getGameHistory";

vi.mock("../../src/pages/Profile/getGameHistory");

const mockedGetGameHistory = vi.mocked(getGameHistory);

function makeGameHistory(count: number): jsonGameHistory {
	const gameResults = Array.from({ length: count }, (_, i) => ({
		id: i,
		score: 100,
		wpm: 80 + i,
		cpm: 400 + i,
		accuracy: 0.95,
		timeMs: 40000 + i * 1000,
		placement: 1,
		finished: true,
		sessionId: i,
		userId: 1,
		displayName: "Player One",
		session: {
			id: i,
			charCount: 300,
			wordCount: 60,
			textPrompt: "some text",
			startedAt: "2026-08-04T11:59:00.000Z",
			finishedAt: "2026-08-04T12:00:00.000Z",
			results: [
				{
					wpm: 80 + i,
					cpm: 400 + i,
					accuracy: 0.95,
					timeMs: 40000 + i * 1000,
					placement: 1,
					displayName: "Player One",
				},
			],
		},
	}));

	return { gameResults };
}

import { afterEach } from "vitest";

afterEach(() => {
	mockedGetGameHistory.mockReset();
});

test("renders nothing when gameHistory is null", () => {
	mockedGetGameHistory.mockReturnValue(null);

	const { container } = render(<GameHistory />);

	expect(container).toBeEmptyDOMElement();
});

test("renders one entry per game result", () => {
	mockedGetGameHistory.mockReturnValue(makeGameHistory(3));

	render(<GameHistory />);

	// 3 game results -> 3 "Placement:" cells rendered
	expect(screen.getAllByText(/Placement:/i)).toHaveLength(3);
});

test("renders game results in reverse order (most recent first)", () => {
	const gameHistory = makeGameHistory(2);
	gameHistory.gameResults[0].wpm = 60; // oldest
	gameHistory.gameResults[1].wpm = 90; // most recent
	mockedGetGameHistory.mockReturnValue(gameHistory);

	render(<GameHistory />);

	const wpmEntries = screen.getAllByText(/Words per minute:/i);
	// index 1 (wpm 90) should render before index 0 (wpm 60), since the loop counts down
	expect(wpmEntries[0]).toHaveTextContent("90");
	expect(wpmEntries[1]).toHaveTextContent("60");
});
