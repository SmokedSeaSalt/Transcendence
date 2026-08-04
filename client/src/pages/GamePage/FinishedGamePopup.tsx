import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import Popup from "../../components/Popup";
import { useSocket } from "./SocketContext";
import { RoomState, type RoomUser } from "./SocketTypes";

export default function FinishedGamePopup() {
	const [open, setOpen] = useState<boolean>(false);
	const [userResults, setUserResults] = useState<Map<string, RoomUser>>(
		new Map(),
	);
	const { roomState } = useSocket();
	const [finishedStartedAt, setFinishedStartedAt] = useState<Date>(new Date());

	useEffect(() => {
		if (!roomState) return;
		if (roomState.state === RoomState.FINISHED) {
			setOpen(true);
			if (roomState.startedAt) setFinishedStartedAt(roomState.startedAt);

			const tempUserResults = new Map(
				Object.entries(roomState.users).sort(
					([, a], [, b]) =>
						(a.finishedAt
							? new Date(a.finishedAt).getTime()
							: Number.MAX_SAFE_INTEGER) -
						(b.finishedAt
							? new Date(b.finishedAt).getTime()
							: Number.MAX_SAFE_INTEGER),
				),
			);
			setUserResults(tempUserResults);
		}
		if (roomState.state === RoomState.COUNTDOWN) {
			setOpen(false);
		}
	}, [roomState]);

	return (
		<div>
			{open && <ReactConfetti />}

			<Popup open={open} onClose={() => setOpen(false)}>
				<div className="text-mist-100">
					<h3>Game results!</h3>
					<div>
						{Array.from(userResults.entries()).map(
							([socketId, user], index) => (
								<div key={socketId} className="flex justify-between">
									<div>
										{index + 1}. {user.displayName}
									</div>

									<div>
										{user.finishedAt && finishedStartedAt
											? (
													(new Date(user.finishedAt).getTime() -
														new Date(finishedStartedAt).getTime()) /
													1000
												).toFixed(2)
											: "N/A"}{" "}
										seconds
									</div>
								</div>
							),
						)}
					</div>
				</div>
			</Popup>
		</div>
	);
}
