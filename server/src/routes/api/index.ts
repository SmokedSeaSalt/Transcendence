import express from "express";
import { authenticate, requireAdmin } from "../../middleware/apiAuthentication.js";
import userRoutes from "./users.js";
import meRoutes from "./me.js"

const router = express.Router();

router.use(authenticate);

router.use("/users", requireAdmin, userRoutes);
router.use("/me", meRoutes);


export default router;
