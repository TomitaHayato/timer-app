import { Router } from "express";
import { authCheckMiddleware } from "../../middlewares/auth/auth";

const router = Router();

router.use(authCheckMiddleware);

export default router;
