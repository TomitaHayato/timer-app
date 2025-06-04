import { Router } from "express";
import authRouter from "./auth/authRouter"
import todosRouter from './todos/todosRouter'
import settingsRouter from './settings/settingsRouter'

const routers = Router();

routers.use('/auth', authRouter);
routers.use('/todos', todosRouter);
routers.use('/settings', settingsRouter);

export default routers
