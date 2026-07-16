import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError, ForbiddenError } from "../errors/errorTypes.js"
import { prisma } from "../db.js";
import { createHash } from "node:crypto";

// Gets the user from the provided api key and sets req.user so that next has access to it. If api key invalid, return error.
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return next(new UnauthorizedError('No API key provided'));
	}

	try {
		const hashedApiKey = await createHash("sha256").update(authHeader).digest("hex");
		const apiKey = await prisma.aPIKey.findUnique({
			where: { hashedKey: hashedApiKey },
			select: {
				scope: true,
				user: {
					select: {
						id: true,
						email: true,
					},
				},
			},
		});

		if (!apiKey) {
			return next(new UnauthorizedError('Invalid API key'));
		}

		// Attach decoded user info to request for later middleware
		req.user = {
			id: apiKey.user.id,
			email: apiKey.user.email,
			role: apiKey.scope,
			hashedApiKey: hashedApiKey,
		};

		return next();
	} catch (error: any) {
		console.log(error);
		return next(new UnauthorizedError('Invalid API key'));
	}
};

export const requireAdmin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.user?.role !== "admin") {
		return next(new ForbiddenError('Admin access required'));
	}

	next();
};
