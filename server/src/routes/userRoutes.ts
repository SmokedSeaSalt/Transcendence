import { Router } from "express";
import * as userController from "../controllers/userControllers.js";

const router = Router();

router.get("/hello", userController.getHello);
router.post("/user", userController.createUser);

export default router;