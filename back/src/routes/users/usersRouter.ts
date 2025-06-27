import { Router } from "express";
import { authCheckMiddleware } from "../../middlewares/auth/auth";
import { deleteUser, updateUserProfile } from "../../controllers/users/users";

const router = Router();

router.use(authCheckMiddleware);

router.put('/', updateUserProfile);
router.delete('/', deleteUser);

export default router
