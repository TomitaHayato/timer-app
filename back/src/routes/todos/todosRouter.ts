import { Router } from "express";
import { authCheckMiddleware } from "../../middlewares/auth/auth";
import { deleteTodoRecord, postTodos, todosIndex, updateTodoRecord, updateTodosStatus } from "../../controllers/todos/todos.controller";
import { todosPostValidator, todosUpdateStatusValidator, todosUpdateValidator } from "../../middlewares/validators/todosValidator";
import { handleValidationResult } from "../../middlewares/validators/handleValidationResult";

const router = Router();

// 認証Check
router.use(authCheckMiddleware);

// CRUD処理
router.get('/', todosIndex);
router.post('/', todosPostValidator, handleValidationResult, postTodos);
router.post('/:id/status', todosUpdateStatusValidator, handleValidationResult, updateTodosStatus);
router.put('/:id', todosUpdateValidator, handleValidationResult, updateTodoRecord);
router.delete('/:id', deleteTodoRecord);

export default router;
