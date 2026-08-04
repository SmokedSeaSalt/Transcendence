import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import MyStats from "../../src/pages/Profile/MyStats";
import type { jsonGameHistory } from "../../src/pages/Profile/getGameHistory";

function makeGameHistory(
	overrides: Partial<jsonGameHistory["gameResults"][0]> = {},
): jsonGameHistory {
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
					results: [
						{
							wpm: 85,
							cpm: 425,
							accuracy: 0.97,
							timeMs: 42000,
							placement: 1,
							displayName: "Player One",
						},
					],
				},
				...overrides,
			},
		],
	};
}

test("renders placement, wpm, and cpm", () => {
	render(<MyStats gameHistory={makeGameHistory()} index={0} />);

	expect(screen.getByText(/Placement: 1/i)).toBeInTheDocument();
	expect(screen.getByText(/Words per minute: 85/i)).toBeInTheDocument();
	expect(screen.getByText(/Characters per minute: 425/i)).toBeInTheDocument();
});

test("renders time converted to seconds", () => {
	render(
		<MyStats gameHistory={makeGameHistory({ timeMs: 42000 })} index={0} />,
	);

	expect(screen.getByText(/Time:\s*42\.00 sec/i)).toBeInTheDocument();
});

test("renders DNF when timeMs is -1", () => {
	render(<MyStats gameHistory={makeGameHistory({ timeMs: -1 })} index={0} />);

	expect(screen.getByText(/Time:\s*DNF/i)).toBeInTheDocument();
	expect(screen.queryByText(/sec/i)).not.toBeInTheDocument();
});

test("renders formatted date", () => {
	const gameHistory = makeGameHistory();
	render(<MyStats gameHistory={gameHistory} index={0} />);

	const expectedDate = new Date(
		gameHistory.gameResults[0].session.finishedAt,
	).toLocaleString("en-NL");

	expect(
		screen.getByText(new RegExp(`Date:.*${expectedDate}`, "i")),
	).toBeInTheDocument();
});

test("renders zero values correctly (not falsy-blank)", () => {
	render(
		<MyStats
			gameHistory={makeGameHistory({ placement: 0, wpm: 0, cpm: 0 })}
			index={0}
		/>,
	);

	expect(screen.getByText(/Placement: 0/i)).toBeInTheDocument();
	expect(screen.getByText(/Words per minute: 0/i)).toBeInTheDocument();
	expect(screen.getByText(/Characters per minute: 0/i)).toBeInTheDocument();
});

test("uses the correct index when multiple game results exist", () => {
	const gameHistory = makeGameHistory({ placement: 1 });
	gameHistory.gameResults.push({
		...gameHistory.gameResults[0],
		placement: 3,
		wpm: 60,
	});

	render(<MyStats gameHistory={gameHistory} index={1} />);

	expect(screen.getByText(/Placement: 3/i)).toBeInTheDocument();
	expect(screen.getByText(/Words per minute: 60/i)).toBeInTheDocument();
});
