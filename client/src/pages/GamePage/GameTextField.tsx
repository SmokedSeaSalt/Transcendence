import type * as CSS from "csstype";
import { useState } from "react";
import { useSocket } from "./SocketContext";
import { RoomState } from "./SocketTypes";

export default function GameTextField() {
	const { socket, setRoomState, roomState } = useSocket();
	const prompt_arr = [
		"this",
		"is",
		"the",
		"wor.d",
		"array",
		"and",
		"more",
		"wor.ds.",
		"lorem",
		"ipsum",
		"dolor.",
		"this",
		"is",
		"the",
		"word",
		"array",
	];
	// to be replaced with { roomState?.prompt } when active
	const prompt = prompt_arr.join(" ");

	const [cheating, setCheating] = useState<boolean>(false);
	const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

	const [typedText, setTypedText] = useState<string>("");
	// complete contains words that should no longer be touched; incomplete is everything else
	// typed & untyped & typedWrong are for marking what the player is doing with incomplete
	const [promptComplete, setPromptComplete] = useState<string>("");
	const [promptIncomplete, setPromptIncomplete] = useState<string>(prompt);
	const [promptTyped, setPromptTyped] = useState<string>("");
	const [promptUntyped, setPromptUntyped] = useState<string>(prompt);
	const [promptTypedWrong, setPromptTypedWrong] = useState<string>("");

	const compare = async (currentPrompt: string, typed: string) => {
		for (let i = 0; i < typed.length; i++) {
			if (typed[i] !== currentPrompt[i]) {
				setPromptUntyped(currentPrompt.substring(typed.length));
				setPromptTypedWrong(currentPrompt.substring(i, typed.length));
				setPromptTyped(currentPrompt.substring(0, i));
				return;
			}
			if (typed[i] === " ") {
				socket?.emit("completedWord", typed);
				setTypedText("");
				const completeLength = promptComplete.length + typed.length;
				setPromptComplete(prompt.substring(0, completeLength));
				setPromptIncomplete(prompt.substring(completeLength));
				setPromptTyped("");
				setPromptTypedWrong("");
				setPromptUntyped(prompt.substring(completeLength));
				return;
			}
		}
		if (promptIncomplete.length === typed.length) {
			socket?.emit("completedWord", typed);
			console.log("GAME OVER!");
			setPromptComplete(prompt);
			setPromptIncomplete("");
			setPromptUntyped("");
			setPromptTyped("");
			setPromptTypedWrong("");
			return;
		}
		setPromptUntyped(promptIncomplete.substring(typed.length));
		setPromptTyped(promptIncomplete.substring(0, typed.length));
		setPromptTypedWrong("");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTypedText(e.target.value);
		compare(promptIncomplete, e.target.value);
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		console.log("cheating attempt");
		e.preventDefault();
		setCheating(true);
		setTimeout(() => setCheating(false), 2000);
	};

	// make it clear whether the type box is in focus or not
	let outerClassName = "outline-double outline-orange-200 relative max-h-50/100";
	if (isInputFocused) {
		outerClassName = "outline-solid relative bg-orange-100 max-h-50/100 ";
	}

	let spaceFromSide = (promptComplete.length + promptTyped.length + promptTypedWrong.length) * 12 - 5;
	// let spaceFromSide = 99;
	let spaceFromTop = 0;

	const caretStyle: CSS.Properties = {
		position: "absolute",
		width: "2px",
		background: "#00000",
		borderRadius: "4px",
		left: `${spaceFromSide}px`,
		// left: `${spaceFromSide}%`,
		top: `${spaceFromTop}px`,
		fontSize: "20px",
		fontFamily: "monospace"
	};

	return (
		<>
			<div className={outerClassName}>
				{/* <div className="top-0"> */}
				<div style={{fontSize: "20px", fontFamily: "monospace"}}>
					{!promptComplete && !promptTyped ? (<span className="bg-green-500 border-r-1 border-black inline">{promptComplete}</span>) : (<span className="bg-green-500 inline">{promptComplete}</span>)}
					{/* <span className="bg-green-500 border-r-1 border-black inline">{promptComplete}</span> */}
					{!promptTypedWrong ? (<span className="bg-green-300 border-r-1 border-black inline">{promptTyped}</span>) : (<span className="bg-green-300 inline">{promptTyped}</span>)}
					{/* <span className="bg-green-300 border-r-1 border-black inline">{promptTyped}</span> */}
					<span className="bg-red-300 border-r-1 border-black inline">{promptTypedWrong}</span>
					<span className="text-gray-600 inline">{promptUntyped}</span>
				</div>
				{/* <div style={caretStyle}>|</div> */}
				<div className="absolute top-0 opacity-0 w-100/100 h-100/100">
					<input
						// autoFocus // linter doesn't like it
						value={typedText}
						onChange={handleChange}
						className="w-100/100 h-100/100"
						onPaste={handlePaste}
						onFocus={() => setIsInputFocused(true)}
						onBlur={() => setIsInputFocused(false)}
					/>
				</div>
				{cheating ? (
					<div className="absolute flex items-center justify-center top-0 h-100/100 w-100/100 bg-red-800 text-white">
						<p style={{ fontSize: "3vh" }}>NO CHEATING</p>
					</div>
				) : (
					""
				)}
			</div>
		</>
	);
}
