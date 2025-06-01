import { Router } from "express";
import { authCheck } from "../../middlewares/auth/auth";
import { getDefault } from "../../controllers/users/users";
import { signUp } from "../../controllers/auth/auth";
import { userPostValidator } from "../../middlewares/validators/users";
import { handleValidationResult } from "../../middlewares/validators/handleValidationResult";

const router = Router()

router.get('/', authCheck, getDefault);

router.post('/signup', userPostValidator, handleValidationResult, signUp);

export default router
