import { createHash } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { prisma } from "../db.js";
import {
	BadRequestError,
	ForbiddenError,
	UnauthorizedError,
} from "../errors/errorTypes.js";

// Gets the user from the provided api key and sets req.user so that next has access to it. If api key invalid, return error.
export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return next(new UnauthorizedError("No API key provided"));
	}

	try {
		const hashedApiKey = createHash("sha256").update(authHeader).digest("hex");
		const apiKey = await prisma.aPIKey.findUnique({
			where: { hashedKey: hashedApiKey },
			select: {
				user: {
					select: {
						id: true,
						email: true,
						role: true,
					},
				},
			},
		});

		if (!apiKey) {
			return next(new UnauthorizedError("Invalid API key"));
		}

		// Attach decoded user info to request for later middleware
		req.user = {
			id: apiKey.user.id,
			email: apiKey.user.email,
			role: apiKey.user.role,
			hashedApiKey: hashedApiKey,
		};

		return next();
	} catch (error: unknown) {
		if (error instanceof Error) {
			next(error);
		} else {
			next(new Error(String(error)));
		}
	}
};

export const requireAdmin = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (req.user?.role !== "admin") {
		return next(new ForbiddenError("Admin access required"));
	}

	next();
};

export const isValidIdFormat = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const INT32_MAX = 2 ** 31 - 1;

	const number = Number(req.params.id);
	if (!number || number >= INT32_MAX) {
		next(new BadRequestError("Bad Request"));
	}

	next();
};
