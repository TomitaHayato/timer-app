import { useAppDispatch } from "../../../reduxStore/hooks"
import { completeTodo } from "../todoSlice";
import type { Todo } from "../types/todoType"

type Props ={
  todo: Todo,
  index: number,
}

export default function TodoItem({ todo, index, }: Props) {
  const dispatch = useAppDispatch();

  function hundleComplete() {
    dispatch(completeTodo(todo.id));
  }

  return(
    <>
      <li className="list-row items-center px-2">
        <div className="text-xl font-thin opacity-30 tabular-nums">{index}</div>
        <div>
          <p>{todo.title}</p>
        </div>

        {
          todo.status
            ? <button className="btn btn-sm btn-info btn-circle"    onClick={hundleComplete}>↩︎</button>
            : <button className="btn btn-sm btn-success btn-circle" onClick={hundleComplete}>✔︎</button>
        }

        <button className="btn btn-sm btn-outline btn-square">
          🗑️
        </button>
        
      </li>
    </>
  )
}