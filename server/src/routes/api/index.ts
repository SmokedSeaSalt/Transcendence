import express from "express";
import { authenticate, requireAdmin } from "../../middleware/apiAuthentication.js";
import userRoutes from "./users.js";

const router = express.Router();

router.use(authenticate);

router.use("/users", requireAdmin, userRoutes);

export default router;
