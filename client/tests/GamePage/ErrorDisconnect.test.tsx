// for when backend sends a socket disconnect upon a failed room creation etc
// this page should be visible when a disconnect is not immediately followed by a connect

import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import ErrorBox from "../../src/pages/GamePage/ErrorBox";
import { SocketProvider } from "../../src/pages/GamePage/SocketContext";

test("force disconnect should give error page", async () => {
	render(
		<SocketProvider>
			<ErrorBox />
		</SocketProvider>,
	);

	expect(
		await screen.findByText(/Something went wrong and you were disconnected/i),
	).toBeInTheDocument();
});
