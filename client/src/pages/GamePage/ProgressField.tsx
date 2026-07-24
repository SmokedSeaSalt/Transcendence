import ProgressBar from "./ProgressBar";
import { useSocket } from "./SocketContext";

// [bar colour, marker colour]
const colourPalettes: [string, string][] = [
	["bg-blue-400", "#1665ee"],
	["bg-pink-400", "#bc4b8b"],
	["bg-green-500", "#399856"],
	["bg-orange-300", "#f3a90a"],
	["bg-purple-400", "#a054d6"],
];

export default function ProgressField() {
	const { socket, setRoomState, roomState } = useSocket();
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
				<div className="flex h-10">
					<div className="w-10/100 h-100/100 content-center">
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
			{roomState ? (
				<p>User count: {Object.keys(roomState.users).length}</p>
			) : (
				<p>No room state.</p>
			)}
			<div className="w-100%">{progressBars}</div>
		</>
	);
}
