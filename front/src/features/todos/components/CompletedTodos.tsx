import { useAppSelector } from "../../../reduxStore/hooks";
import TodoList from "./TodoList";
import { selectTodosCompleted } from "../todoSlice";

export default function CompletedTodos() {
  const todos = useAppSelector(selectTodosCompleted);

  return (
    <>
      <h3 className="text-lg font-semibold text-center mb-4">完了したTodo</h3>
      <div className="mb-12">
        <TodoList todos={todos} />
      </div>
    </>
  )
}
