import type { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../errors/errorTypes.js";
import * as userServices from "../../services/userServices.js";
import { deleteUserById } from "../../services/userServices.js";

export const createUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, name, password } = req.body;
		const user = await userServices.createUser(email, name, password);
		res.status(201).json(user);
	} catch (error: unknown) {
		if (error instanceof Error) {
			next(error);
		} else {
			next(new Error(String(error)));
		}
	}
};

export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const count = await userServices.deleteUserById(Number(req.params.id));

		if (count === 0) {
			return next(new NotFoundError("User Not Found"));
		}

		res.status(204).send();
	} catch (error: unknown) {
		if (error instanceof Error) {
			next(error);
		} else {
			next(new Error(String(error)));
		}
	}
};
