import { Router } from "express";
import { getDefault } from "../../controllers/users/users";
import { signIn, signOut, signUp, tokenCheck } from "../../controllers/auth/auth";
import { signInValidator, userPostValidator } from "../../middlewares/validators/users";
import { handleValidationResult } from "../../middlewares/validators/handleValidationResult";
import { authCheckMiddleware } from "../../middlewares/auth/auth";

const router = Router()

router.get('/', getDefault);

router.get('/check', tokenCheck);
router.post('/signup', userPostValidator, handleValidationResult, signUp);
router.post('/signin', signInValidator  , handleValidationResult, signIn);
router.post('/signout',authCheckMiddleware, signOut);

export default router
