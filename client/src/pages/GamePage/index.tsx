import React, { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";

export default function GamePage() {
	const [message, setMessage] = useState("");
	useEffect(() => {
		const socket = io({
			withCredentials: true,
			path: "/web/socket.io"
		});
		
		socket.on("connect", () => {
		console.log(socket.id);
		setMessage(socket.id!);
		});

	return () => {
		socket.disconnect();
	};

	}, []);

	const handleClick = async () => {
		const response = await fetch("/health");
		const text = await response.text();
		setMessage(text);
	};

	return (
		<main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
			<h1>React + Express</h1>
			<button type="button" onClick={handleClick}>
				Call /health
			</button>
			{message ? <p>{message}</p> : null}
		</main>
	);
}
