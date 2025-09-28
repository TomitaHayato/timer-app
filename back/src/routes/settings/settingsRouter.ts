import { Router } from "express";
import { authCheckMiddleware } from "../../middlewares/auth/auth";
import { postSetting, putSetting } from "../../controllers/settings/settings.controller";
import { verifyCsrfTokenMiddleware } from "../../middlewares/csrf/csrf";
import { settingsPostValidator, settingsUpdateValidator } from "../../middlewares/validators/settingsValidator";
import { handleValidationResult } from "../../middlewares/validators/handleValidationResult";

const router = Router();

router.use(authCheckMiddleware);

router.post('/', verifyCsrfTokenMiddleware, settingsPostValidator, handleValidationResult, postSetting);
router.put('/', settingsUpdateValidator, handleValidationResult, putSetting);

export default router;
