import dayjs from "dayjs"
import type { Todo } from "../../todos/types/todoType"

type Props = {
  todo: Todo,
  setTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
}

export function TodoItem({ todo, setTodo }: Props) {
  function handleClick() {
    setTodo(todo);
  }

  return(
    <>
      <button className="btn bg-gray-700 w-full flex flex-col gap-0" onClick={handleClick}>
        <p>{todo.title}</p>
        {
          !todo.isCompleted && todo.deadline
          && <p className="text-warning text-xs">{dayjs(todo.deadline).format('YYYY年 MM月DD日')}</p>
        }
      </button>
    </>
  )
}
