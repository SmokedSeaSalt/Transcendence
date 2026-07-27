import { Router } from "express";
import * as userController from "../../controllers/web/userControllers.js";
import { checkCookieStatus } from "../../middleware/cookieAuthentication.js";

const router = Router();

router.use(checkCookieStatus);

router.get("/", userController.buildUserResponseFromSession);

export default router;
