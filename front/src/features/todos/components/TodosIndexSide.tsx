import { useState } from "react";
import { useAppSelector } from "../../../reduxStore/hooks";
import { rightDrawer } from "../../../utils/class";
import { selectTodosUncompleted } from "../todoSlice";
import TodoCreateForm from "./TodoCreateForm";
import TodoList from "./TodoList";

export default function TodosIndexSide() {
  const todos = useAppSelector(selectTodosUncompleted);

  const [todosSide, setTodosSide] = useState<boolean>(false);
  
    function hundleTodoSide() {
      setTodosSide(prev => !prev);
    }

  return(
    <>
      <button className={`btn bg-blue-300 rounded-full fixed right-2 z-30 text-black`} onClick={hundleTodoSide}>
        Todo一覧
      </button>

      <div className={`py-12 px-2 z-20 fixed right-0 top-16 min-h-11/12 w-80 bg-gray-600 transition duration-150 ${rightDrawer(todosSide)}`}>
        <div className="mb-4 flex justify-center">
          <TodoCreateForm />
        </div>

        <div>
          <TodoList todos={todos}/>
        </div>
      </div>
    </>
  )
}
