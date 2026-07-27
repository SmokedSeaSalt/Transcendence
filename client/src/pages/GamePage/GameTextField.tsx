import { useState } from "react";
import { useSocket } from "./SocketContext";
import { RoomState } from "./SocketTypes";

export default function GameTextField() {
	const { socket, setRoomState, roomState } = useSocket();
	const prompt =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
	// to be replaced with { roomState?.prompt } when active -> needs to be joined
	// const prompt = "Lorem ipsum dolor sit amet.";

	const [typedText, setTypedText] = useState<string>("");
	// complete contains words that should no longer be touched; incomplete is everything else
	// typed & untyped & typedWrong are for marking what the player is doing with incomplete
	const [promptComplete, setPromptComplete] = useState<string>("");
	const [promptIncomplete, setPromptIncomplete] = useState<string>(prompt);
	const [promptTyped, setPromptTyped] = useState<string>("");
	const [promptUntyped, setPromptUntyped] = useState<string>(prompt);
	const [promptTypedWrong, setPromptTypedWrong] = useState<string>("");

	// const logValues = () => {
	// 	console.log(
	// 		"COMPLETE: ",
	// 		promptComplete,
	// 		"\nINCOMPLETE: ",
	// 		promptIncomplete,
	// 	);
	// 	console.log("TYPED: ", promptTyped, "\nUNTYPED: ", promptUntyped);
	// };

	const compare = async (currentPrompt: string, typed: string) => {
		// console.log("Going to compare prompt with ", typed);
		for (let i = 0; i < typed.length; i++) {
			if (typed[i] !== currentPrompt[i]) {
				// console.log("mismatch at i: ", i);
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
		if (promptIncomplete.length === typed.length)
		{
			socket?.emit("completedWord", typed);
			console.log("GAME OVER!");
			setPromptComplete(prompt);
			setPromptIncomplete("");
			setPromptUntyped("");
			setPromptTyped("");
			setPromptTypedWrong("");
			return ;
		}
		setPromptUntyped(promptIncomplete.substring(typed.length));
		setPromptTyped(promptIncomplete.substring(0, typed.length));
		setPromptTypedWrong("");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTypedText(e.target.value);
		compare(promptIncomplete, e.target.value);
	};

	return (
		<>
			<div className="outline-double">
				<p className="bg-green-500 inline">{promptComplete}</p>
				<p className="bg-green-300 inline">{promptTyped}</p>
				<p className="bg-red-300 inline">{promptTypedWrong}</p>
				<p className="text-gray-500 inline">{promptUntyped}</p>
				<input
					value={typedText}
					onChange={handleChange}
					placeholder="Type here"
					className="w-100/100"
				/>
			</div>
		</>
	);
}
