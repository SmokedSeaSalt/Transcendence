import type { NextFunction, Request, Response } from "express";
import * as userServices from "../services/userServices.js";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, name, password } = req.body;

		// Validate input
		if (!email || !name || !password) {
			return res.status(400).json({ error: "Missing required fields: " + email + " " + name + " " + password });
		}

		const user = await userServices.createUser(email, name, password);
		res.status(201).json(user);
	} catch (error: any) {
		next(error);
	}
};
