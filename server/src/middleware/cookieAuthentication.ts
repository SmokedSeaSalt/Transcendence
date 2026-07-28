import type { NextFunction, Request, Response } from "express";
import { NotFoundError, UnauthorizedError } from "../errors/errorTypes.js";
import {
	getUserSession,
	invalidateSession,
} from "../services/sessionServices.js";

// Get the session from the cookie token, check if it is 1) invalid, 2) valid but expired,
// 3) valid and not expired
export const checkCookieStatus = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const sessionToken = req.cookies.session;
	if (!sessionToken) {
		return next(new UnauthorizedError("No session token found."));
	}
	try {
		const userSession = await getUserSession(sessionToken);
		if (!userSession) {
			return next(new UnauthorizedError("Invalid session token."));
		}
		const currentDate = new Date(Date.now());
		if (currentDate > userSession.expiresAt) {
			console.log("Cookie is expired.");
			invalidateSession(sessionToken);
			res.clearCookie("session", {
				httpOnly: true,
				sameSite: "strict",
				secure: true,
			});
			return next(new UnauthorizedError("Expired session token."));
		}

		req.user = {
			id: userSession.user.id,
			email: userSession.user.email,
			role: userSession.user.role,
		};

		return next();
	} catch (error: unknown) {
		if (error instanceof Error) {
			return next(error);
		}
		return next(new Error(String(error)));
	}
};
