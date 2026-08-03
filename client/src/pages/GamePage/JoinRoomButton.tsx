import { useState } from "react";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import { chooseRoomIdSchema } from "./schemas";
import { useConnectToRoom } from "./useConnectToRoom";

export default function JoinRoomButton() {
	const [open, setOpen] = useState<boolean>(false);
	const [roomId, setRoomId] = useState<string>("");
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const { emitJoinRoom, loading, error } = useConnectToRoom();

	const clickJoinRoom = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setOpen(true);
	};

	const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result = chooseRoomIdSchema.safeParse({ roomId });
		if (!result.success) {
			const errors: Record<string, string> = {};
			result.error.issues.forEach((err) => {
				const field = err.path[0] as string;
				errors[field] = err.message;
			});
			setFieldErrors(errors);
			return;
		}
		const { success, message } = await emitJoinRoom(roomId);
		if (loading) return;
		if (!success) {
			const errors: Record<string, string> = {};
			errors.roomId = message;
			setFieldErrors(errors);
			console.log("joinroom fail");
		} else {
			setFieldErrors({});
			setOpen(false);
			console.log("joinroom success");
			return;
		}
	};

	return (
		<div>
			<Button onClick={clickJoinRoom} type={"button"}>
				Join room
			</Button>

			<Popup open={open} onClose={() => setOpen(false)}>
				<form
					onSubmit={submit}
					style={{ display: "flex", flexDirection: "column", gap: 8 }}
				>
					<h3 className="text-gray-200">
						Warning: you will leave your current room!
					</h3>
					<div>
						<input
							autoFocus
							value={roomId}
							onChange={(e) => setRoomId(e.target.value)}
							placeholder="Room ID"
							className="bg-white w-100/100"
						/>
						{fieldErrors.roomId && (
							<div role="alert" style={{ color: "red" }}>
								{fieldErrors.roomId}
							</div>
						)}
					</div>
					<Button loading={loading}>Connect</Button>
				</form>
			</Popup>
		</div>
	);
}
