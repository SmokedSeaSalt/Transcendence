import express from "express";
import {
	authenticate,
	requireAdmin,
} from "../../middleware/apiAuthentication.js";
import { limiter } from "../../middleware/apiLimiter.js";

import meRoutes from "./me.js";
import userRoutes from "./users.js";

const router = express.Router();

router.use(authenticate);
router.use(limiter);

router.use("/users", requireAdmin, userRoutes);
router.use("/me", meRoutes);

export default router;
