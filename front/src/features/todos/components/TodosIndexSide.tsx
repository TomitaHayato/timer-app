import { useState } from "react";
import { useAppSelector } from "../../../reduxStore/hooks";
import { rightDrawer } from "../../../utils/class";
import { selectTodosUncompleted } from "../todoSlice";
import TodoList from "./TodoList";
import { sortTodosAscByDeadline } from "../utils/todoSort";
import { TodoCreateFormModalBtn } from "./TodoCreateFormModalBtn";

export default function TodosIndexSide() {
  const todos = useAppSelector(selectTodosUncompleted);

  const [todosSide, setTodosSide] = useState<boolean>(false); // TodoのDrawerが表示されているか
  
  function hundleTodoSide() {
    setTodosSide(prev => !prev);
  }

  return(
    <>
      <button className={`btn bg-indigo-400 rounded-full fixed right-2 z-30 text-black`} onClick={hundleTodoSide}>
        Todo
      </button>

      <div className={`py-12 px-2 z-20 rounded-lg fixed right-0 top-14 h-11/12 w-96 bg-gray-500 transition duration-150 ${rightDrawer(todosSide)}`}>
        <div className="text-end mt-2 mb-2">
          <TodoCreateFormModalBtn />
        </div>

        <div className="overflow-auto h-11/12 pb-40">
          <TodoList todos={sortTodosAscByDeadline(todos)}/>
        </div>
      </div>
    </>
  )
}
