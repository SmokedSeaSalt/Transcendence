import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../../swagger/index.js";

import userRoutes from "./users.js";

const router = express.Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router.use("/users", userRoutes);

export default router;
