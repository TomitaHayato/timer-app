import { useAppSelector } from "../../../reduxStore/hooks";
import TodoList from "../../todos/components/TodoList";
import { selectTodosCompleted } from "../../todos/todoSlice";
import { selectTimer } from "../timerSlice";

export default function Records() {
  const { count } = useAppSelector(selectTimer);
  const todos = useAppSelector(selectTodosCompleted)

  return (
    <>
      <h3 className="text-lg font-semibold text-center mb-4">今日の記録</h3>
      <div className="text-center mb-12">
        <p className="">完了済ポモドーロ: {count}</p>
        <p className="">合計集中時間：{'125分'}</p>
      </div>

      <h3 className="text-lg font-semibold text-center mb-4">完了したTodo</h3>
      <div className="mb-12">
        <TodoList todos={todos} />
      </div>
    </>
  )
}
