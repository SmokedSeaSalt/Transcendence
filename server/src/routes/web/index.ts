import express from "express";

import meRoutes from "./me.js";
import userRoutes from "./users.js";

const router = express.Router();

router.use("/me", meRoutes);
router.use("/users", userRoutes);

export default router;
