import { Router } from "express";
import { signIn, signOut, signUp, tokenCheck, tokensRefresh } from "../../controllers/auth/auth";
import { signInValidator, userPostValidator } from "../../middlewares/validators/usersValidator";
import { handleValidationResult } from "../../middlewares/validators/handleValidationResult";
import { authCheckMiddleware } from "../../middlewares/auth/auth";

const router = Router()

router.get('/check', tokenCheck);
router.post('/signup', userPostValidator, handleValidationResult, signUp);
router.post('/signin', signInValidator  , handleValidationResult, signIn);
router.delete('/signout', authCheckMiddleware, signOut);
router.post('/token_refresh', tokensRefresh);

export default router
