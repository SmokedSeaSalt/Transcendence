import type * as CSS from "csstype";
import type React from "react";
import ProgressBar from "./ProgressBar";

export default function ProgressField() {
	// const { roominfo } = use..Context();

	// 1) get user count from somewhere
	// 2) user count == amount of progress bars -> figure out a for loop?
	// 3) give each bar different colours -> from some dict somewhere?
	// 4) give each bar correct values from context

	// only grab once from room info
	const totalWords = 100;

	return (
		<div className="w-100%">
			<ProgressBar
				barColour="bg-blue-400"
				circleColour="#1665ee"
				currentWords={1}
				totalWords={totalWords}
			/>
			<ProgressBar
				barColour="bg-pink-400"
				circleColour="#bc4b8b"
				currentWords={29}
				totalWords={totalWords}
			/>
			<ProgressBar
				barColour="bg-green-500"
				circleColour="#399856"
				currentWords={41}
				totalWords={totalWords}
			/>
		</div>
	);
};
