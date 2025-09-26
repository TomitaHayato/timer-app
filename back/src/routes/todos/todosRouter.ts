import { Router } from "express";
import { authCheckMiddleware } from "../../middlewares/auth/auth";
import { deleteTodoRecord, postTodos, todosIndex, updateTodoRecord, updateTodosStatus } from "../../controllers/todos/todos.controller";
import { todosPostValidator, todosUpdateValidator } from "../../middlewares/validators/todosValidator";
import { handleValidationResult } from "../../middlewares/validators/handleValidationResult";
import { verifyCsrfTokenMiddleware } from "../../middlewares/csrf/csrf";

const router = Router();

router.use(authCheckMiddleware); // 認証Check

// CRUD処理
router.get('/', todosIndex);
router.post('/', verifyCsrfTokenMiddleware, todosPostValidator, handleValidationResult, postTodos);
router.put('/:id/is_completed', updateTodosStatus);
router.put('/:id', todosUpdateValidator, handleValidationResult, updateTodoRecord);
router.delete('/:id', deleteTodoRecord);

export default router;
