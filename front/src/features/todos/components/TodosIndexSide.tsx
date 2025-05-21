import { useAppSelector } from "../../../reduxStore/hooks";
import { selectTodosUncompleted } from "../todoSlice";
import TodoCreateForm from "./TodoCreateForm";
import TodoList from "./TodoList";

export default function TodosIndexSide() {
  const todos = useAppSelector(selectTodosUncompleted)

  return(
    <>
      <div className="bg-indigo-400 py-4 px-2 z-20 absolute right-0 min-h-10/12 w-80">
        <div className="mb-8">
          <h3 className="text-center text-2xl">Todoリスト</h3>
        </div>

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
