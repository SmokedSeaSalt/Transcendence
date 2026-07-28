import Button from "../../components/Button";
import JoinRoomButton from "./JoinRoomButton";
import { useSocket } from "./SocketContext";
import { useLeaveRoom } from "./useLeaveRoom";
import { useStartGame } from "./useStartGame";

export default function GamePageHeader() {
	const { socket, setRoomState, roomState } = useSocket();
	const { leaveRoom, loading, error } = useLeaveRoom();
	// todo: change back to regular loading when separate files for buttons are made
	const { startGame, loadingStart, errorStart } = useStartGame();

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
				<Button type="button" onClick={handleLeaveClick}>
					Leave room
				</Button>
				<Button type="button" onClick={handleStartClick}>
					Start game
				</Button>
				{roomState ? (
					<p>
						Current room ID: <br />
						{roomState.roomId}
					</p>
				) : (
					<p>Currently not in a room.</p>
				)}
			</div>
		</>
	);
}
