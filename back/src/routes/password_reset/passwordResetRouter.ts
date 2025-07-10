import { Router } from "express";
import { sendEmailForPasswordReset, tokenCheck } from "../../controllers/password_resets/passwordResets.controller";

const router = Router();

router.post('/send_mail', sendEmailForPasswordReset);
router.post('/token_check', tokenCheck)

export default router
