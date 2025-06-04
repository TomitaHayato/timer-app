import { Router } from "express";
import { authCheckMiddleware } from "../../middlewares/auth/auth";
import { todosIndex } from "../../controllers/todos/todos.controller";

const router = Router();

// 認証Check
router.use(authCheckMiddleware);

// CRUD処理
router.get('/', todosIndex);
// router.post('/');
// router.post('/:id/status');
// router.put('/:id');
// router.delete('/:id');

export default router;
