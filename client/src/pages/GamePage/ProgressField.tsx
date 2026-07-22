import type * as CSS from "csstype";
import type React from "react";
import ProgressBar from "./ProgressBar";
import type { RoomStatePayload } from "./SocketTypes";

interface ProgressFieldProps {
	roomState: RoomStatePayload | null;
}

const ProgressField: React.FC<ProgressFieldProps> = (props) => {
	// 1) some blanket roomstate != null check? or maybe catch that outside?
	// 2) user count == amount of progress bars -> figure out a for loop?
	// could make a progressBars = [], and use progressBars.push({...})

	// 3) give each bar different colours -> from some dict somewhere?
	// 4) give each bar correct values from context

	// only grab once from room info
	let totalWords = 1;
	if (props.roomState?.wordCount !== undefined) {
		totalWords = props.roomState.wordCount;
	}

	return (
		<>
			{props.roomState?.users ? (
				<p>User count: {Object.keys(props.roomState?.users).length}</p>
			) : (
				<p>No users or roomstate.</p>
			)}
			<div className="w-100%">
				<ProgressBar
					barColour="bg-blue-400"
					circleColour="#1665ee"
					currentWords={10} // pass user instead?
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
		</>
	);
};

export default ProgressField;
