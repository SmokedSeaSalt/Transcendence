import type { NextFunction, Request, Response } from "express";
import { rateLimit, ipKeyGenerator } from 'express-rate-limit'
import { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS } from "../config/rateLimit.js"

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
		})
	}
})

