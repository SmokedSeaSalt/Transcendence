// // for when backend sends a socket disconnect upon a failed room creation etc
// // this page should be visible when a disconnect is not immediately followed by a connect

// import { render, screen } from "@testing-library/react";
// import { SocketProvider } from "../../src/pages/GamePage/SocketContext";
// import GamePage from "../../src/pages/GamePage/index";
// import userEvent from "@testing-library/user-event";
// import { afterEach, expect, test, vi } from "vitest";
// import ErrorBox from "../../src/pages/GamePage/ErrorBox";

// test("force disconnect should give error page", async () => {
// 	render(
// 		<SocketProvider>
// 			<GamePage />
// 		</SocketProvider>,
// 	);

// 	// force disconnect


// 	// expect(await screen.findByText(/Connect/i)).toBeInTheDocument();
// 	expect(await screen.findByText(/Something went wrong and you were disconnected/i)).toBeInTheDocument();
// });