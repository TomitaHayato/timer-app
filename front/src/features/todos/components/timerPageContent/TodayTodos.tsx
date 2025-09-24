import { useAppSelector } from "../../../../reduxStore/hooks"
import { containerGrayClass } from "../../../../utils/class";
import { selectSimpleBg } from "../../../display/visibleSlice"
import { selectTodayTodos } from "../../todoSlice";
import { TodayTodo } from "./TodayTodo";
import { TodayTodoStatus } from "./TodayTodoStatus";


export function TodayTodos() {
  const simpleBg = useAppSelector(selectSimpleBg);
  const todos = useAppSelector(selectTodayTodos);

  // クラス
  const textMdClass = simpleBg ? "text-gray-400 text-center" : "text-gray-500 text-center"
  const textLgClass = simpleBg ? "text-gray-400 text-center text-lg font-semibold" : "text-gray-500 text-center text-lg font-semibold"
  // メモ化
  const todosListNode = (
    <div>
      <TodayTodoStatus/>
      <ul className="my-4">
        { todos.filter(todo => !todo.isCompleted).map(todo => <TodayTodo todo={todo} />) }
        <p className="text-center text-sm my-3 font-semibold text-blue-500">完了済み</p>
        { todos.filter(todo => todo.isCompleted).map(todo => <TodayTodo todo={todo} />) }
      </ul>
    </div>
  )

  return(
    <>
      <div className={containerGrayClass(simpleBg)}>
        <div className="mb-4">
          <h3 className={textLgClass}>今日のタスク</h3>
        </div>
        {
          todos.length === 0
          ? <p className={textMdClass}>今日のTaskはありません</p>
          : todosListNode
        }
      </div>
    </>
  )
}