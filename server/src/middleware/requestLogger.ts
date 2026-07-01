import type { NextFunction, Request, Response } from "express";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
	console.log(
		[
			`[${new Date().toISOString()}]`,
			`${req.method} ${req.originalUrl}`,
			`ip=${req.ip}`,
			`ua=${req.get("user-agent") ?? "-"}`,
			`query=${JSON.stringify(req.query)}`,
			`body=${JSON.stringify(req.body)}`,
		].join(" | "),
	);

	next();
};