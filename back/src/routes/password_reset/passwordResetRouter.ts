import { Router } from "express";
import { sendEmailForPasswordReset } from "../../controllers/password_resets/passwordResets.controller";

const router = Router();

router.post('/send_mail', sendEmailForPasswordReset);

export default router
