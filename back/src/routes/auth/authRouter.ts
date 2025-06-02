import { Router } from "express";
import { authCheck } from "../../middlewares/auth/auth";
import { getDefault } from "../../controllers/users/users";
import { signIn, signUp } from "../../controllers/auth/auth";
import { signInValidator, userPostValidator } from "../../middlewares/validators/users";
import { handleValidationResult } from "../../middlewares/validators/handleValidationResult";

const router = Router()

router.get('/', authCheck, getDefault);

router.post('/signup', userPostValidator, handleValidationResult, signUp);
router.post('/signin', signInValidator, handleValidationResult, signIn);

export default router
