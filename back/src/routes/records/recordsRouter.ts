import { Router } from "express";
import { authCheckMiddleware } from "../../middlewares/auth/auth";
import { recordsPostValidator } from "../../middlewares/validators/recordsValidator";
import { handleValidationResult } from "../../middlewares/validators/handleValidationResult";
import { postRecord, recordsIndex } from "../../controllers/records/records.controller";
import { verifyCsrfTokenMiddleware } from "../../middlewares/csrf/csrf";

const router = Router();

router.use(authCheckMiddleware);

router.post('/', verifyCsrfTokenMiddleware, recordsPostValidator, handleValidationResult, postRecord);
router.get('/', recordsIndex);

export default router;
