import { userResponseSchema } from "../validators/userValidators.js";
import type { User } from "@prisma/client";
import z from "zod";

export type PublicUser = z.infer<typeof userResponseSchema>;

export const toPublicUser = (user: User): PublicUser =>
	userResponseSchema.parse(user);