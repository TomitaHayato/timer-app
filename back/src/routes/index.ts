import { Router } from "express";
import authRouter from "./auth/authRouter"
import todosRouter from './todos/todosRouter'
import settingsRouter from './settings/settingsRouter'
import recordsRouter from './records/recordsRouter'
import usersRouter from './users/usersRouter'

const routers = Router();

routers.use('/auth', authRouter);
routers.use('/todos', todosRouter);
routers.use('/records', recordsRouter);
routers.use('/settings', settingsRouter);
routers.use('/users', usersRouter);

export default routers
