import { createHash } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { prisma } from "../db.js";
import { ForbiddenError, UnauthorizedError } from "../errors/errorTypes.js";

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
				expiresAt: true,
			},
		});

		if (!apiKey) {
			return next(new UnauthorizedError("Invalid API key"));
		}

		if (apiKey.expiresAt.getTime() < Date.now()) {
			return next(new UnauthorizedError("API key expired"));
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
		console.log(error);
		return next(new UnauthorizedError("Invalid API key"));
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
