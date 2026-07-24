import type { User } from "@prisma/client";
import type z from "zod";
import { userResponseSchema } from "../validators/userValidators.js";

export type PublicUser = z.infer<typeof userResponseSchema>;

export const toPublicUser = (user: User): PublicUser => {
	return userResponseSchema.parse(user);
};
