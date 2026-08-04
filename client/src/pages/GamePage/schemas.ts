import z from "zod";

export const chooseRoomIdSchema = z.object({
	roomId: z
		.string()
		.length(6, "Room ID is six digits")
		.regex(/^[0-9]*$/, "Room ID is a six digit number"),
});
