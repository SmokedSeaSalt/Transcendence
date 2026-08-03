import Button from "../../components/Button";
import JoinRoomButton from "./JoinRoomButton";
import { useSocket } from "./SocketContext";
import { RoomState } from "./SocketTypes";
import { useLeaveRoom } from "./useLeaveRoom";
import { useStartGame } from "./useStartGame";

export default function GamePageHeader() {
	const { socket, setRoomState, roomState } = useSocket();
	const { leaveRoom, loading, error } = useLeaveRoom();
	// todo: change back to regular loading when separate files for buttons are made
	const { startGame, loadingStart, errorStart } = useStartGame();

	const startDisabled =
		roomState?.roomLeader !== socket?.id ||
		roomState?.state !== RoomState.LOBBY;

	const handleLeaveClick = async () => {
		leaveRoom();
	};

	const handleStartClick = async () => {
		startGame();
	};

	return (
		<>
			<div className="flex place-content-end m-1 space-x-2">
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
