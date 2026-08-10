import Button from "../../components/Button";
import JoinRoomButton from "./JoinRoomButton";
import { useSocket } from "./SocketContext";
import { RoomState } from "./SocketTypes";
import { useLeaveRoom } from "./useLeaveRoom";
import { useStartGame } from "./useStartGame";

export default function GamePageHeader({
	isSpectator,
}: {
	isSpectator: boolean;
}) {
	const { socket, roomState } = useSocket();
	const { leaveRoom, error } = useLeaveRoom();
	const { startGame, errorStart } = useStartGame();

	const startDisabled =
		roomState?.roomLeader !== socket?.id ||
		roomState?.state !== RoomState.LOBBY;

	const handleLeaveClick = async () => {
		leaveRoom();
		if (error) console.log(error);
	};

	const handleStartClick = async () => {
		startGame();
		if (errorStart) console.log(errorStart);
	};

	return (
		<>
			<div className="flex place-content-end m-1 space-x-2">
				<div className="flex items-center place-content-end m-1 space-x-2 font-bold">
					{isSpectator && <h3>You are spectating.</h3>}
				</div>
				<JoinRoomButton />
				<div>
					<Button type="button" onClick={handleLeaveClick}>
						Leave room
					</Button>
				</div>
				<div>
					<Button
						type="button"
						onClick={handleStartClick}
						disabled={startDisabled}
					>
						Start game
					</Button>
				</div>
				<div>
					{roomState ? (
						<p>
							Current room ID: <br />
							<span className="text-lg font-bold">{roomState.roomId}</span>
						</p>
					) : (
						<p>Currently not in a room.</p>
					)}
				</div>
			</div>
		</>
	);
}
