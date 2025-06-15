import { useState } from "react"
import type { Todo } from "../../todos/types/todoType"
import { Modal } from "../../../components/Modal";
import { openModal } from "../../../utils/modelCtl";
import { selectSortedTodos } from "../../todos/todoSlice";
import { useAppSelector } from "../../../reduxStore/hooks";
import { TodoItem } from "./TodoItem";
import { SelectedTodo } from "./SelectedTodo";
import { selectAuthStatus } from "../../session/slices/sessionSlice";

export function TodoSelector() {
  const todos = useAppSelector(selectSortedTodos);
  const isAuth = useAppSelector(selectAuthStatus);
  const [ todo, setTodo ] = useState<Todo | null>(null);

  return(
    <>
      <div className="max-w-1/3 text-center mx-auto my-4">
        {
          todo
          ? <SelectedTodo todo={todo} setTodo={setTodo}/>
          : <button disabled={!isAuth} className="btn btn-outline text-indigo-300" onClick={() => openModal('todoSelector')}>Todoを選択</button>
        }
      </div>

      <Modal modalId={'todoSelector'}>
        <p className="text-center mb-2">Todoを選択してください</p>
        {
          todos.length === 0
          ? <p className="text-center text-lg">Todoがありません</p>
          : todos.filter((todo: Todo) => !todo.isCompleted).map((todo: Todo) => <TodoItem key={todo.id} todo={todo} setTodo={setTodo}/>)
        }
      </Modal>
    </>
  )
}