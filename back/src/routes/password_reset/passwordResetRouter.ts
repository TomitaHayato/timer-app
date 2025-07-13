import { Router } from "express";
import { resetPassword, sendEmailForPasswordReset, tokenCheck } from "../../controllers/password_resets/passwordResets.controller";
import { passwordResetTokenValidator } from "../../middlewares/validators/passwordResetTokenValidator";
import { handleValidationResult } from "../../middlewares/validators/handleValidationResult";

const router = Router();

router.post('/send_mail', sendEmailForPasswordReset);
router.post('/token_check', tokenCheck);
router.put('/password_update', passwordResetTokenValidator, handleValidationResult, resetPassword); // バリデーションミドルウェアが必要

export default router
