import React from "react";
import { useState } from "react";
import ProgressBar from "../Game/ProgressBar";

export default function LoginPage() {
	const [message, setMessage] = useState("");

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
			<div className="w-200"> <ProgressBar /> </div>
		</main>
	);
}
