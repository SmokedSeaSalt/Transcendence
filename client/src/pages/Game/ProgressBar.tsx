import React from "react";
import type * as CSS from 'csstype';

export default function ProgressBar() {
	var total_words = 90;
	var current_words = 30;
	// todo: 97.9 depends on marker height/width (which depends on container height) and length set outside function
	var progress: number = current_words / total_words * 98;

	console.log("progress:", progress);
	var barColour = "bg-blue-400";
	var circleColour = "#2561c9";

	// automatically updates distance from top when markerSize is updated so it's always centered
	const markerSize = 80;
	const topDistance = (100 - markerSize) / 2;
	var markerStyle: CSS.Properties = {
		height: `${markerSize}%`,
		aspectRatio: 1/1,
		position: `absolute`,
		backgroundColor: `${circleColour}`,
		left: `${progress}%`,
		top: `${topDistance}%`,
		borderRadius: '100%',
	};

	const containerStyle = "relative bottom-0 left-0 h-6 content-center";
	// const containerStyle = "relative bg-gray-300 bottom-0 left-0 h-6 content-center";
	const barStyle = `${barColour} h-2 rounded-sm left-0 bottom-0`;


	return (
		<div className={containerStyle}>
			<div className={barStyle}>
				<div style={markerStyle}></div>
			</div>
		</div>
	);
}
