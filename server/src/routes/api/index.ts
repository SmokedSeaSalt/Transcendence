import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../../swagger/spec.js";

import userRoutes from "./users.js";

const router = express.Router();

router.use("/users", userRoutes);

export default router;
