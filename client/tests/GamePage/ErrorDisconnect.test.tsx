// // for when backend sends a socket disconnect upon a failed room creation etc
// // this page should be visible when a disconnect is not immediately followed by a connect

// import { render, screen } from "@testing-library/react";
// import { SocketProvider } from "../../src/pages/GamePage/SocketContext";
// import GamePage from "../../src/pages/GamePage/index";
// import userEvent from "@testing-library/user-event";
// import { afterEach, expect, test, vi } from "vitest";
// import ErrorBox from "../../src/pages/GamePage/ErrorBox";
// import { io as Client, type Socket } from "socket.io-client";
// import { type Server as HttpServer, createServer } from "node:http";
// import { beforeEach } from "node:test";
// import { ServerToClientEvents } from "../../src/pages/GamePage/SocketTypes";
// import { ClientToServerEvents } from "../../src/pages/GamePage/SocketTypes";
// // import { registerSocketHandlers } from "../../../server/src/socket";
// // import { Server } from "socket.io";


// test("force disconnect should give error page", async () => {
// 	let httpServer: HttpServer;
// 	// let ioServer: Server;
// 	let client1: Socket;
// 	let client1Id: string;
// 	let url: string;

// 	beforeEach(async () => {
// 		httpServer = createServer();

// 		// ioServer = new Server<ServerToClientEvents, ClientToServerEvents>(
// 		// 	httpServer,
// 		// 	{
// 		// 		//set lower timeout intervals for disconnection checking
// 		// 		pingInterval: 1000, // send a ping every 1 second
// 		// 		pingTimeout: 2000, // disconnect if no pong within 2 seconds
// 		// 	},
// 		// );

// 		// registerSocketHandlers(ioServer);

// 		await new Promise<void>((resolve) => {
// 			httpServer.listen(() => resolve());
// 		});

// 		const address = httpServer.address();

// 		if (!address || typeof address === "string") {
// 			throw new Error("Failed to get server address");
// 		}

// 		url = `http://localhost:${address.port}`;

// 		client1 = Client(url);

// 		await Promise.all([
// 			new Promise<void>((resolve) => client1.on("connect", resolve)),
// 		]);

// 		await new Promise((r) => setTimeout(r, 50));

// 		if (!client1) {
// 			throw new Error("client is null");
// 		}

// 		if (client1.id) client1Id = client1.id;
// 		else throw new Error("Client did not connect");

// 		if (!client1Id) {
// 			throw new Error("Client did not connect");
// 		}

// 		client1.disconnect();
// 	});


// 	render(
// 		<SocketProvider>
// 			<GamePage />
// 		</SocketProvider>,
// 	);


// 	expect(await screen.findByText(/Something went wrong and you were disconnected/i)).toBeInTheDocument();
// });
