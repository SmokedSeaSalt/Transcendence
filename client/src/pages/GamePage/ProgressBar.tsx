import type * as CSS from "csstype";
import type React from "react";
import { RoomUser } from "./SocketTypes";


interface ProgressBarProps {
	colourPalette: [string, string];
	totalWords: number;
	user: RoomUser | undefined; // = displayName & progress
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
	let currentWords = 0;
	if (props.user)
		currentWords = props.user.progress;
	let progress: number = (currentWords / props.totalWords) * 100;

	// for error handling, but something would be very wrong before this happens -> currently keep for testing
	if (progress > 100) progress = 100;

	// automatically updates distance from top when markerSize is updated so it's always centered
	const markerSize = 80;
	const topDistance = (100 - markerSize) / 2;
	const markerStyle: CSS.Properties = {
		height: `${markerSize}%`,
		aspectRatio: 1 / 1,
		position: "absolute",
		backgroundColor: `${props.colourPalette[1]}`,
		left: `${progress}%`,
		top: `${topDistance}%`,
		borderRadius: "100%",
	};

	const containerStyle = "relative bottom-0 left-0 h-6 content-center";
	const barStyle = `absolute ${props.colourPalette[0]} h-2 w-100/100 rounded-sm bottom-2`;
	return (
		<div className={containerStyle}>
			<div className={barStyle} />
			<div style={markerStyle} />
		</div>
	);
};

export default ProgressBar;
