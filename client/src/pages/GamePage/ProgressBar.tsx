import type * as CSS from "csstype";
import type React from "react";

interface ProgressBarProps {
	barColour: string;
	circleColour: string;
	totalWords: number;
	currentWords: number; // set this to | 0? 
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
	// todo: either change the final factor from 100 depending on width of container, width of marker
	// or add a finish line in the overall progress container and let it run off
	let progress: number = (props.currentWords / props.totalWords) * 99;

	// for error handling, but something would be very wrong before this happens -> currently keep for testing
	if (progress > 100) progress = 100;

	// automatically updates distance from top when markerSize is updated so it's always centered
	const markerSize = 80;
	const topDistance = (100 - markerSize) / 2;
	const markerStyle: CSS.Properties = {
		height: `${markerSize}%`,
		aspectRatio: 1 / 1,
		position: "absolute",
		backgroundColor: `${props.circleColour}`,
		left: `${progress}%`,
		top: `${topDistance}%`,
		borderRadius: "100%",
	};

	const containerStyle = "relative bottom-0 left-0 h-6 content-center";
	// const containerStyle = "relative bg-gray-300 bottom-0 left-0 h-6 content-center";
	const barStyle = `absolute ${props.barColour} h-2 w-100/100 rounded-sm bottom-2`;

	return (
		<div className={containerStyle}>
			<div className={barStyle} />
			<div style={markerStyle} />
		</div>
	);
};

export default ProgressBar;
