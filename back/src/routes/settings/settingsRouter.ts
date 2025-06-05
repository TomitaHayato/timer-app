import { Router } from "express";
import { authCheckMiddleware } from "../../middlewares/auth/auth";
import { getSetting, postSetting, putSetting } from "../../controllers/settings/settings.controller";

const router = Router();

router.use(authCheckMiddleware);

// router.get('/', getSetting);
router.post('/', postSetting);
router.put('/:id', putSetting);

export default router;
