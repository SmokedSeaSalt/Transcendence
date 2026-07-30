import { Router } from "express";
import * as meController from "../../controllers/web/meController.js";
import { checkCookieStatus } from "../../middleware/cookieAuthentication.js";

const router = Router();

router.use(checkCookieStatus);

router.get("/", meController.buildUserResponseFromSession);
router.get("/gameHistory", meController.getGameHistory);
router.get("/stats", meController.getGameStats);

export default router;
