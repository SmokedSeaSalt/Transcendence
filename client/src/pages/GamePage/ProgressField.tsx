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
					<div className="relative h-100/100 content-center">
						<div className="absolute w-16 h-30/100 z-0 bg-[repeating-conic-gradient(_black_0_25%,_white_25%_50%)] bg-[length:15px] bg-top-left" />
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
