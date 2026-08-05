import express from "express";

import leaderboardRoutes from "./leaderboard.js";
import meRoutes from "./me.js";
import userRoutes from "./users.js";

const router = express.Router();

router.use("/me", meRoutes);
router.use("/users", userRoutes);
router.use("/leaderboard", leaderboardRoutes);

export default router;
