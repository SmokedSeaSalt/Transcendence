import React from "react";

export default function ProgressBar() {
	var total_words = 100;
	var current_words = 30;
	// since position is not counted from object center, max distance is 97.5%
	var progress: number = Math.round(current_words / total_words * 97.5);
	var progressPercentage: string = "left-[" + progress + "%]"; // for some reason only certain percentages work
	console.log("prog percentage: ", progressPercentage);
	var barColour = "bg-blue-400";
	var circleColour = "bg-blue-700";


	return (
		<div className="relative bottom-0 left-0 h-6 bg-gray-300 content-center">
		{/* // <div className="relative h-6 bottom-0 left-0 content-center"> */}
			<div className={`${barColour} h-2 rounded-sm left-0 bottom-0`}>
				<div className={`relative bottom-[75%] ${progressPercentage} ${circleColour} h-5 w-5 rounded-full`}></div>
				{/* <div className={`relative bottom-[75%] left-[26%] ${circleColour} h-5 w-5 rounded-full`}></div> */}
			</div>
		</div>
	);
}

