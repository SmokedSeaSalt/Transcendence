import type * as CSS from "csstype";
import type React from "react";
import ProgressBar from "./ProgressBar";
import type { RoomStatePayload } from "./SocketTypes";

interface ProgressFieldProps {
	roomState: RoomStatePayload | null;
}

const colourPalettes: [string, string][] = [
	["bg-blue-400", "#1665ee"],
	["bg-pink-400", "#bc4b8b"],
	["bg-green-500", "#399856"],
	["bg-orange-300", "#f3a90a"],
	["bg-purple-400", "#a054d6"],
];

const ProgressField: React.FC<ProgressFieldProps> = (props) => {
	// only grab once from room info
	let totalWords = 1;
	if (props.roomState?.wordCount !== undefined) {
		totalWords = props.roomState.wordCount;
	}

	// add one bar per user
	const progressBars = [];
	if (props.roomState?.users) {
		// todo: maybe catch this outside and only make
		let i = 0;
		for (const [key, value] of Object.entries(props.roomState?.users)) {
			const colourChoice = i % colourPalettes.length;
			console.log("Making bar for user: ", key);
			progressBars.push(
				<ProgressBar
					colourPalette={colourPalettes[colourChoice]}
					totalWords={totalWords}
					user={value}
				/>,
			);
			i++;
		}
	}

	return (
		<>
			{props.roomState?.users ? (
				<p>User count: {Object.keys(props.roomState?.users).length}</p>
			) : (
				<p>The room is loading.</p>
			)}
			<div className="w-100%">{progressBars}</div>
		</>
	);
};

export default ProgressField;
