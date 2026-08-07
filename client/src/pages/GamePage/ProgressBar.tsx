import type * as CSS from "csstype";
import type React from "react";
import bikePic from "../../assets/bike.svg";
import type { RoomUser } from "./SocketTypes";

interface ProgressBarProps {
	colourPalette: [string, string, string]; // = bar colour (tailwind style), marker colour (hex code), hue-rotate (deg)
	totalWords: number;
	user: RoomUser | undefined; // user = displayName & progress
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
	let currentWords = 0;
	if (props.user) currentWords = props.user.progress;
	let progress: number = (currentWords / props.totalWords) * 100;

	// for error handling, but something would be very wrong before this happens -> currently keep for testing
	if (progress > 100) progress = 100;

	// automatically updates distance from top when markerSize is updated so it's always centered
	// note: 50 depends on the h- value set for containerStyle & the h- & bottom- values set for barStyle
	const markerSize = 160;
	const topDistance = (50 - markerSize) / 2;
	const markerStyle: CSS.Properties = {
		height: `${markerSize}%`,
		aspectRatio: 1 / 1,
		position: "absolute",
		// backgroundColor: `${props.colourPalette[1]}`,
		left: `${progress}%`,
		top: `${topDistance}%`,
		borderRadius: "100%",
		alignContent: "center",
		margin: "auto",
		zIndex: "1",
	};

	const containerStyle = "relative h-100/100 content-center";
	const barStyle = `absolute ${props.colourPalette[0]} h-30/100 w-100/100 rounded-l-sm`;
	const imgStyle = `w-100/100 m-auto ${props.colourPalette[2]}`;
	return (
		<div className={containerStyle}>
			<div className={barStyle} />
			<div style={markerStyle}>
				<img className={imgStyle} src={bikePic} alt="bike img" />
			</div>
		</div>
	);
};

export default ProgressBar;
