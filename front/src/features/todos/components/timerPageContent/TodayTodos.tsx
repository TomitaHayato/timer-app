import { useAppSelector } from "../../../../reduxStore/hooks"
import { containerGrayClass } from "../../../../utils/class";
import { selectSimpleBg } from "../../../display/visibleSlice"
import { selectTodayTodos } from "../../todoSlice";
import { TodayTodo } from "./TodayTodo";


export function TodayTodos() {
  const simpleBg = useAppSelector(selectSimpleBg);
  const todos = useAppSelector(selectTodayTodos);

  // クラス
  const textMdClass = simpleBg ? "text-gray-400 text-center" : "text-gray-500 text-center"
  const textLgClass = simpleBg ? "text-gray-400 text-center text-lg font-semibold" : "text-gray-500 text-center text-lg font-semibold"
  // メモ化
  const todosNode = todos.map(todo => <TodayTodo todo={todo} />);

  return(
    <>
      <div className={containerGrayClass(simpleBg)}>
        <div className="mb-4">
          <h3 className={textLgClass}>今日のタスク</h3>
        </div>
        {
          todos.length === 0
          ? <p className={textMdClass}>今日のTaskはありません</p>
          : todosNode
        }
      </div>
    </>
  )
}