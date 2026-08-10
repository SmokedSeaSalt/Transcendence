import { ipKeyGenerator, rateLimit } from "express-rate-limit";
import {
	RATE_LIMIT_MAX_REQUESTS,
	RATE_LIMIT_WINDOW_MS,
} from "../config/rateLimit.js";

export const limiter = rateLimit({
	windowMs: RATE_LIMIT_WINDOW_MS,
	limit: RATE_LIMIT_MAX_REQUESTS,
	keyGenerator: (req) => {
		if (!req.user || !req.user.hashedApiKey) {
			return ipKeyGenerator(req.ip ?? "unknown");
		}
		return req.user.hashedApiKey;
	},
	handler: (req, res) => {
		res.status(429).json({
			message: "Rate limit exceeded. Try again later.",
		});
	},
});
