import type { User } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import {
	invalidateSession,
	updateSession,
} from "../../services/sessionServices.js";
import * as userServices from "../../services/userServices.js";
import { updateAPIKey } from "../../services/apiKeyServices.js";

export const createUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, name, password } = req.body;
		//create new user
		const user: User = await userServices.createUser(email, name, password);
		//create sessionToken
		const sessionToken: string = await updateSession(user);
		//put sessionToken in cookies
		res.cookie("session", sessionToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		res.status(201).json(user);
	} catch (error: unknown) {
		if (error instanceof Error) {
			next(error);
		} else {
			next(new Error(String(error)));
		}
	}
};

export const loginUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, password } = req.body;
		//verify credentials
		const user: User = await userServices.authenticateUser(email, password);
		//create sessionToken
		const sessionToken: string = await updateSession(user);
		//put sessionToken in cookies
		res.cookie("session", sessionToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		res.status(201).json(user);
	} catch (error: unknown) {
		if (error instanceof Error) {
			next(error);
		} else {
			next(new Error(String(error)));
		}
	}
};

export const logoutUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		//get token
		const token = req.cookies.session;
		if (!token) {
			return res.status(401).json({ error: "Not logged in" });
		}
		//invalidate token
		invalidateSession(token);
		//delete token from coockies
		res.clearCookie("session", {
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		});
		res.status(201).json({ message: "logged out" });
	} catch (error: unknown) {
		if (error instanceof Error) {
			next(error);
		} else {
			next(new Error(String(error)));
		}
	}
};

export const updateApiKey = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		//get token
		const token = req.cookies.session;
		if (!token) {
			return res.status(401).json({ error: "Not logged in" });
		}
		//get user from token
		const user = await userServices.getUserFromSession(token);
		//update apikey

		if (!user) {
			return res.status(401).json({ error: "Invalid token" });
		}
		const apikey = await updateAPIKey(user, "user");
		//return apikey
		res.status(201).json({ apikey: apikey });
	} catch (error: unknown) {
		if (error instanceof Error) {
			next(error);
		} else {
			next(new Error(String(error)));
		}
	}
};
