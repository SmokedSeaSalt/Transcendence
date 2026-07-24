import type * as CSS from "csstype";
import type React from "react";
import bongoCatPic from "../../assets/logo_temp_cat.png";
import troutPic from "../../assets/trout.jpg";
import type { RoomUser } from "./SocketTypes";

interface ProgressBarProps {
	colourPalette: [string, string]; // = bar colour (tailwind style), marker colour (hex code)
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
	// note: 110 depends on the h- value set for containerStyle & the h- & bottom- values set for barStyle
	const markerSize = 95;
	const topDistance = (110 - markerSize) / 2;
	const markerStyle: CSS.Properties = {
		height: `${markerSize}%`,
		aspectRatio: 1 / 1,
		position: "absolute",
		backgroundColor: `${props.colourPalette[1]}`,
		left: `${progress}%`,
		top: `${topDistance}%`,
		borderRadius: "100%",
		alignContent: "center",
		margin: "auto",
	};

	const containerStyle = "relative bottom-0 left-0 h-100/100 content-center";
	const barStyle = `absolute ${props.colourPalette[0]} h-30/100 w-100/100 rounded-sm bottom-3/10`;
	return (
		<div className={containerStyle}>
			<div className={barStyle} />
			<div style={markerStyle}>
				<img
					className="rounded-lg w-90/100 m-auto"
					src={bongoCatPic}
					alt="cat img"
				/>
			</div>
		</div>
	);
};

export default ProgressBar;
