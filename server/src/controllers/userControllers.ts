import { Request, Response } from "express";
import * as userServices from "../services/userServices.js";

export const getHello = async (req: Request, res: Response) => {
	const user = await userServices.getFirstUser();
	res.send(`hello ${user?.name ?? "nobody"}`);
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const { email, name, unhashedPassword } = req.body;

		// Validate input
		if (!email || !name || !unhashedPassword) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		const user = await userServices.createUser(email, name, unhashedPassword);
		res.status(201).json(user);
	} catch (error: any) {
		// Check for specific Prisma errors
		if (error.code === "P2002") {
			return res.status(409).json({ error: "Email already exists" });
		}

		// Generic error
		res.status(500).json({ error: "Failed to create user" });
	}
};
