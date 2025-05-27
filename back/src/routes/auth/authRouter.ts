import { NextFunction, Response, Router } from "express";
import { authCheck } from "../../middlewares/auth/auth";
import { getDefault } from "../../controllers/users/users";

const router = Router()

router.get('/', authCheck, getDefault);

export default router
