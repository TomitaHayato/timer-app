import { useState } from "react"
import type { Todo } from "../../todos/types/todoType"
import { Modal } from "../../../components/Modal";
import { openModal } from "../../../utils/modelCtl";
import { selectTodos } from "../../todos/todoSlice";
import { useAppSelector } from "../../../reduxStore/hooks";
import { TodoItem } from "./TodoItem";
import { SelectedTodo } from "./SelectedTodo";

export function TodoSelector() {
  const { todos } = useAppSelector(selectTodos);
  const [ todo, setTodo ] = useState<Todo | null>(null);

  return(
    <>
      <div className="max-w-1/3 text-center mx-auto mb-4">
        {
          todo
          ? <SelectedTodo todo={todo} setTodo={setTodo}/>
          : <button className="btn btn-outline" onClick={() => openModal('todoSelector')}>Todoを選択してください</button>
        }
      </div>

      <Modal modalId={'todoSelector'}>
        {
          todos.length === 0
          ? <p className="text-center text-lg">Todoがありません</p>
          : todos.filter((todo: Todo) => !todo.isCompleted).map((todo: Todo) => <TodoItem key={todo.id} todo={todo} setTodo={setTodo}/>)
        }
      </Modal>
    </>
  )
}