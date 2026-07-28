import { Router } from "express";
import * as meController from "../../controllers/web/meController.js";
import { checkCookieStatus } from "../../middleware/cookieAuthentication.js";

const router = Router();

router.use(checkCookieStatus);

router.get("/", meController.buildUserResponseFromSession);
router.get("/gameResults", meController.getGameResults);

export default router;
