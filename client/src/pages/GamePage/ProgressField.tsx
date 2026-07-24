import type * as CSS from "csstype";
import type React from "react";
import ProgressBar from "./ProgressBar";
import type { RoomStatePayload } from "./SocketTypes";
import type { RoomUser } from "./SocketTypes";

interface ProgressFieldProps {
	roomState: RoomStatePayload;
}

// [bar colour, marker colour]
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
	// get scalable height set up here probably in outer div so it gets both names & bars
	const progressBars = [];
	let i = 0;
	for (const [key, value] of Object.entries(props.roomState.users)) {
		progressBars.push(
			<div className="flex h-10">
				<div className="w-10/100 content-center">
					<p className="truncate">{value.displayname}</p>
				</div>
				<div className="w-90/100 pl-1">
					<ProgressBar
						colourPalette={colourPalettes[i % colourPalettes.length]}
						totalWords={totalWords}
						user={value}
					/>
				</div>
			</div>,
		);
		i++;
	}

	return (
		<>
			<p>User count: {Object.keys(props.roomState.users).length}</p>
			<div className="w-100%">{progressBars}</div>
		</>
	);
};

export default ProgressField;
