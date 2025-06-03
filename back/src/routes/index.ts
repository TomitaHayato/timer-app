import { Router } from "express";
import authRouter from "./auth/authRouter"
import todosRouter from './todos/todosRouter'

const routers = Router();

routers.use('/auth', authRouter);
routers.use('/todos', todosRouter);

export default routers
