import type { NextFunction, Request, Response } from "express";
import { ipKeyGenerator, rateLimit } from "express-rate-limit";
import {
	RATE_LIMIT_MAX_REQUESTS,
	RATE_LIMIT_WINDOW_MS,
} from "../config/rateLimit.js";

export const limiter = rateLimit({
	windowMs: RATE_LIMIT_WINDOW_MS,
	limit: RATE_LIMIT_MAX_REQUESTS,
	keyGenerator: (req) => {
		if (!req.user) {
			return ipKeyGenerator(req.ip ?? "unknown"); // in theory should never default to ip because it is set in auth middleware.
		}
		return req.user.hashedApiKey;
	},
	handler: (req, res) => {
		res.status(429).json({
			message: "Rate limit exceeded. Try again later.",
		});
	},
});
