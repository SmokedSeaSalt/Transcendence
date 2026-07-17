import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/errorTypes.js";
import {
	getSessionExpirationDate,
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
		const expirationDate = await getSessionExpirationDate(sessionToken);
		if (!expirationDate) {
			return next(new UnauthorizedError("Invalid session token."));
		}
		const currentDate = new Date(Date.now());
		if (currentDate < expirationDate) {
			console.log("Cookie is expired.");
			invalidateSession(sessionToken);
			res.clearCookie("session", {
				httpOnly: true,
				sameSite: "strict",
				secure: true,
			});
			return next(new UnauthorizedError("Expired session token."));
		}
	} catch (err) {
		console.log("error checkCookieStatus: ", err);
		return next(new UnauthorizedError("Invalid session token."));
	}
	return next();
};
