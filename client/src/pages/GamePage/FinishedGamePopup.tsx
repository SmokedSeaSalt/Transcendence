import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import { chooseRoomIdSchema } from "./schemas";
import { useConnectToRoom } from "./useConnectToRoom";
import { useSocket } from "./SocketContext";
import { RoomState, RoomUser } from "./SocketTypes";
import ReactConfetti from "react-confetti";

export default function FinishedGamePopup() {
	const [open, setOpen] = useState<boolean>(false);
	const [userResults, setUserResults] = useState<RoomUser[]>([])
	const { roomState } = useSocket();


	useEffect(() => {
		if (!roomState) return;
		if (roomState.state === RoomState.FINISHED) {
			setOpen(true);
			const tempUserResults = Object.values(roomState.users).sort((a, b) =>
						(a.finishedAt ? new Date(a.finishedAt).getTime() : Number.MAX_SAFE_INTEGER) -
						(b.finishedAt ? new Date(b.finishedAt).getTime() : Number.MAX_SAFE_INTEGER)
					)
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
						<h3 >
							Game results!
						</h3>
						<div>
							{
								userResults.map((user, index) => (
									<div >
										{index + 1}. {user.displayName}
									</div>
								))
								
							}
						</div>
					</div>
			</Popup>
		</div>
		

	);
}
