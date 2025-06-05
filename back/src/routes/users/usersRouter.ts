import { Router } from "express";
import { authCheckMiddleware } from "../../middlewares/auth/auth";
import { deleteUser } from "../../controllers/users/users";

const router = Router();

router.use(authCheckMiddleware);

router.delete('/', deleteUser);

export default router
