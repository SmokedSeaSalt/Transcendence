import ProgressBar from "./ProgressBar";
import { useSocket } from "./SocketContext";

// [bar colour, marker colour, bike colour starting from blue]
const colourPalettes: [string, string, string][] = [
	["bg-blue-400", "#1665ee", "hue-rotate-0"],
	["bg-pink-400", "#bc4b8b", "hue-rotate-100"],
	["bg-green-500", "#399856", "hue-rotate-240"],
	["bg-orange-300", "#f3a90a", "hue-rotate-160"],
	["bg-purple-400", "#a054d6", "hue-rotate-65"],
];

export default function ProgressField() {
	const { socket, roomState } = useSocket();
	// only grab once from room info
	let totalWords = 1;
	if (roomState?.wordCount !== undefined) {
		totalWords = roomState.wordCount;
	}

	// adds one bar per user
	const progressBars = [];
	console.log("Resetting progress bars");
	let i = 0; // for colour choices
	if (roomState) {
		for (const [key, value] of Object.entries(roomState.users)) {
			progressBars.push(
				<div key={key} className="flex h-10">
					<div className="w-5/100 h-100/100 content-center">
						<p className="truncate">{value.displayName}</p>
					</div>
					<div className="w-90/100 h-100/100 pl-1">
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
	}

	return (
		<>
			<div className="w-100%">{progressBars}</div>
		</>
	);
}
