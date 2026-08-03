// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { afterEach, expect, test, vi } from "vitest";
// import { waitFor } from "@testing-library/react";
// import UserStats from "../../src/pages/Profile/UserStats";
// import { getUserStats } from "../../src/pages/Profile/getUserStats";
// import { redirect } from "react-router-dom";

// type VitestMock = ReturnType<typeof vi.fn>;

// test("see if stats are displayed when fetched", async () => {

// 	// const mockResponse = {
// 	// 	max_wpm: 100,
// 	// 	max_cpm: 0,
// 	// 	max_accuracy: 0,
// 	// 	average_wpm: 20,
// 	// 	average_cpm: 0,
// 	// 	average_accuracy: 0,
// 	// 	wins: 5,
// 	// 	total_games: 10,
// 	// };

// 	const mockResponse = {
// 		ok: true,
// 		redirect: false,

// 	};

// 	render(
// 		<UserStats />
// 	);

// 	globalThis.fetch = vi.fn(() => 
// 		Promise.resolve({
// 			json: () => Promise.resolve(mockResponse),
// 		}),
// 	);


// 	// expect fetch for stats
// 	await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());

// 	// inspect fetch args (URL and request options)
// 	const [url, opts] = mockFetch.mock.calls[0] as [
// 		string,
// 		{ method?: string; body?: string },
// 	];
// 	expect(typeof url).toBe("string");
// 	// expect(getUserStats).toHaveBeenCalled();
// 	expect(JSON.parse(opts.body ?? "")).toEqual( null );
// });
