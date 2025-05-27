import { Router } from "express";
import authRouter from "./auth/authRouter"

const routers = Router();

routers.use('/auth', authRouter);

export default routers
