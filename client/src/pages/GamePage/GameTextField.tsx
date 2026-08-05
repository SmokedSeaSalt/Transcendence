import type * as CSS from "csstype";
import { useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import { RoomState } from "./SocketTypes";

interface TextFieldProps {
	prompt: string[] | undefined;
	isSpectator: boolean;
}

const GameTextField: React.FC<TextFieldProps> = (props) => {
	if (props.prompt === undefined)
		return (
			<div className="text-center text-xl">
				Waiting for the game to start...
			</div>
		);
	const prompt = props.prompt.join(" ");

	const { socket, roomState } = useSocket();
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
	const [counter, setCounter] = useState<number>(5);

	let extraLength = 0; // for submissions with multiple words
	const compare = async (currentPrompt: string, typed: string) => {
		for (let i = 0; i < typed.length; i++) {
			if (typed[i] !== currentPrompt[i]) {
				setPromptUntyped(currentPrompt.substring(typed.length));
				setPromptTypedWrong(currentPrompt.substring(i, typed.length));
				setPromptTyped(currentPrompt.substring(0, i));
				// error based on whether typedWrong got longer
				// & that new character not matching the prompt at that position
				if (
					currentPrompt.substring(i, typed.length).length >
						promptTypedWrong.length &&
					currentPrompt.length >= typed.length &&
					currentPrompt[typed.length - 1] !== typed[typed.length - 1]
				) {
					socket?.emit("wrongCharacter");
				}
				return;
			}
			if (typed[i] === " ") {
				socket?.emit("completedWord", typed.substring(0, i));
				setTypedText(typed.substring(i + 1));
				extraLength = extraLength + i + 1;
				setPromptComplete(
					prompt.substring(0, promptComplete.length + extraLength),
				);
				setPromptIncomplete(
					prompt.substring(promptComplete.length + extraLength),
				);
				compare(
					prompt.substring(promptComplete.length + extraLength),
					typed.substring(i + 1),
				);
				return;
			}
		}
		if (currentPrompt.length === typed.length) {
			socket?.emit("completedWord", typed);
			setTypedText("");
			setPromptComplete(prompt);
			setPromptIncomplete("");
			setPromptUntyped("");
			setPromptTyped("");
			setPromptTypedWrong("");
			return;
		}
		setPromptUntyped(currentPrompt.substring(typed.length));
		setPromptTyped(currentPrompt.substring(0, typed.length));
		setPromptTypedWrong("");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTypedText(e.target.value);
		compare(promptIncomplete, e.target.value);
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		setCheating(true);
		setTimeout(() => setCheating(false), 2000);
	};

	// automatically forces cursor to end of input
	const handleSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
		e.currentTarget.setSelectionRange(
			e.currentTarget.value.length,
			e.currentTarget.value.length,
		);
	};

	// make it clear whether the type box is in focus or not
	let outerClassName =
		"outline-double outline-orange-200 bg-background relative max-h-50/100 rounded-md";
	if (isInputFocused) {
		outerClassName = "outline-solid relative bg-background outline-highlight-colored rounded-md max-h-50/100 ";
	}

	// style for untyped text, with boxShadow used as caret
	const untypedClass = "inline text-text shadow-[-3px_0px_0px_0px_var(--color-highlight-colored)]";

	// timer for countdown
	useEffect(() => {
		const interval = setInterval(() => {
			setCounter((prevCount) => prevCount - 1);
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<>
			{roomState?.state === RoomState.COUNTDOWN ? (
				<div className="text-center text-xl">Game starting in {counter}...</div>
			) : (
				<div className={outerClassName}>
					<div className="text-xl font-mono box-border ">
						<span className="text-typebox-completed inline">{promptComplete}</span>
						<span className="text-typebox-correct inline">{promptTyped}</span>
						<span className="text-red-600 inline">{promptTypedWrong}</span>
						{/* <span className="bg-typebox-completed text-typebox-typed-text inline">{promptComplete}</span>
						<span className="bg-typebox-correct text-typebox-typed-text inline">{promptTyped}</span>
						<span className="bg-typebox-incorrect text-typebox-typed-text inline">{promptTypedWrong}</span> */}
						<span className={untypedClass}>{promptUntyped}</span>
					</div>
					<div className="absolute top-0 opacity-0 size-xl w-100/100 h-100/100">
						<input
							name="gameInput"
							autoFocus
							value={typedText}
							onChange={handleChange}
							onSelect={handleSelect}
							className="w-100/100 h-100/100"
							onPaste={handlePaste}
							onFocus={() => setIsInputFocused(true)}
							onBlur={() => setIsInputFocused(false)}
							maxLength={promptIncomplete.length}
							autoComplete="off"
							autoCapitalize="none"
							spellCheck={false}
							autoCorrect="off"
							disabled={
								roomState?.state !== RoomState.IN_PROGRESS || props.isSpectator
							}
						/>
					</div>
					{cheating ? (
						<div className="absolute flex items-center justify-center font-9xl font-bold top-0 h-100/100 w-100/100 bg-red-800 text-white">
							<p>NO CHEATING</p>
						</div>
					) : (
						""
					)}
				</div>
			)}
		</>
	);
};

export default GameTextField;
