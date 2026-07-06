import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { NextFunction, Request, Response } from "express";
import {
	EmailAlreadyExistsError,
	HashError,
	PasswordValidationError,
} from "../errors/errorTypes.js";

export const errorHandler = (
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.error(`[${req.method}] ${req.originalUrl}`, error);

	if (error instanceof PasswordValidationError) {
		return res.status(400).json({ error: error.message });
	}

	if (error instanceof HashError) {
		return res.status(500).json({ error: error.message });
	}

	if (error instanceof EmailAlreadyExistsError) {
		return res.status(409).json({ error: error.message });
	}

	return res.status(500).json({ error: "Internal server error" });
};
