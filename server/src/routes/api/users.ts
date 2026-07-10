import { Router } from "express";
import * as userController from "../../controllers/api/userControllers.js";
import { createUserValidation } from "../../validators/userValidators.js";

const router = Router();



/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 */
router.post("/register", createUserValidation(), userController.createUser);

export default router;
