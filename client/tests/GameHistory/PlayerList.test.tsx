import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import PlayerList from "../../src/pages/Profile/PlayerList";
import type {
	jsonGameHistory,
	jsonResults,
} from "../../src/pages/Profile/getGameHistory";

function makeResult(overrides: Partial<jsonResults> = {}): jsonResults {
	return {
		wpm: 85,
		cpm: 425,
		accuracy: 0.97,
		timeMs: 42000,
		placement: 1,
		displayName: "Player One",
		...overrides,
	};
}

function makeGameHistory(results: jsonResults[]): jsonGameHistory {
	return {
		gameResults: [
			{
				id: 1,
				score: 100,
				wpm: 85,
				cpm: 425,
				accuracy: 0.97,
				timeMs: 42000,
				placement: 1,
				finished: true,
				sessionId: 1,
				userId: 1,
				displayName: "Player One",
				session: {
					id: 1,
					charCount: 300,
					wordCount: 60,
					textPrompt: "some text",
					startedAt: "2026-08-04T11:59:00.000Z",
					finishedAt: "2026-08-04T12:00:00.000Z",
					results,
				},
			},
		],
	};
}

test("renders a single player with placement, name, and time", () => {
	const gameHistory = makeGameHistory([
		makeResult({ placement: 1, displayName: "Alice", timeMs: 42000 }),
	]);
	render(<PlayerList gameHistory={gameHistory} index={0} />);

	expect(screen.getByText(/1\.\s*Alice/i)).toBeInTheDocument();
	expect(screen.getByText(/42\.00 sec/i)).toBeInTheDocument();
});

test("renders multiple players in order", () => {
	const gameHistory = makeGameHistory([
		makeResult({ placement: 1, displayName: "Alice", timeMs: 30000 }),
		makeResult({ placement: 2, displayName: "Bob", timeMs: 35000 }),
		makeResult({ placement: 3, displayName: "Carol", timeMs: 40000 }),
	]);
	render(<PlayerList gameHistory={gameHistory} index={0} />);

	expect(screen.getByText(/1\.\s*Alice/i)).toBeInTheDocument();
	expect(screen.getByText(/2\.\s*Bob/i)).toBeInTheDocument();
	expect(screen.getByText(/3\.\s*Carol/i)).toBeInTheDocument();
});

test("renders DNF for a player with timeMs -1", () => {
	const gameHistory = makeGameHistory([
		makeResult({ placement: 1, displayName: "Alice", timeMs: 30000 }),
		makeResult({ placement: 2, displayName: "Bob", timeMs: -1 }),
	]);
	render(<PlayerList gameHistory={gameHistory} index={0} />);

	expect(screen.getByText(/30\.00 sec/i)).toBeInTheDocument();
	expect(screen.getByText("DNF")).toBeInTheDocument();
});

test("renders nothing extra when results list is empty", () => {
	const gameHistory = makeGameHistory([]);
	const { container } = render(
		<PlayerList gameHistory={gameHistory} index={0} />,
	);

	// outer wrapper still renders, but no player rows inside
	expect(container.querySelectorAll(".bg-red-300").length).toBe(0);
});
