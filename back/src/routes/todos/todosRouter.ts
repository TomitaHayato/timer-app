import { Router } from "express";
import { authCheckMiddleware } from "../../middlewares/auth/auth";
import { deleteTodoRecord, postTodos, todosIndex, updateTodoRecord, updateTodosStatus } from "../../controllers/todos/todos.controller";
import { todosPostValidator, todosUpdateValidator } from "../../middlewares/validators/todosValidator";
import { handleValidationResult } from "../../middlewares/validators/handleValidationResult";

const router = Router();

// 認証Check
router.use(authCheckMiddleware);

// CRUD処理
router.get('/', todosIndex);
router.post('/', todosPostValidator, handleValidationResult, postTodos);
router.put('/:id/is_completed', updateTodosStatus);
router.put('/:id', todosUpdateValidator, handleValidationResult, updateTodoRecord);
router.delete('/:id', deleteTodoRecord);

export default router;
