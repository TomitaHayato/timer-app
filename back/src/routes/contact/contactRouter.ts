import { Router } from "express";
import { contactValidator } from "../../middlewares/validators/contactValidator";
import { handleValidationResult } from "../../middlewares/validators/handleValidationResult";
import { sendContact } from "../../controllers/contact/contact.controller";

const router = Router();

router.post('/', contactValidator, handleValidationResult, sendContact);

export default router;
