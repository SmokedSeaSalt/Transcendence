import { Router } from "express";
import { body } from "express-validator";
import * as userController from "../controllers/userControllers.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

router.get("/hello", userController.getHello);
router.post(
    "/user",
    [
        body("email").isEmail().normalizeEmail(),
        body("name").trim().isLength({ min: 1, max: 100 }),
        body("password").isLength({ min: 8 }),
        validateRequest,
    ],
    userController.createUser,
);
export default router;