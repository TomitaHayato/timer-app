import dayjs from "dayjs"
import type { Todo } from "../../../../../types/todoType"
import { deadlineColor } from "../../../../../utils/class";
import { closeModal } from "../../../../../utils/modelCtl";

type Props = {
  todo: Todo,
  setTodoId: React.Dispatch<React.SetStateAction<string | null>>,
}

export function TodoOptions({ todo, setTodoId }: Props) {
  function handleClick() {
    setTodoId(todo.id);
    closeModal('todoSelector');
  }

  return(
    <>
      <button className="w-11/12 mx-auto bg-gray-700 flex flex-col my-1 px-4 py-2 text-start rounded-xl hover:border-1" onClick={handleClick}>
        <p>{todo.title}</p>
        {
          !todo.isCompleted && todo.deadline
          && <p className={`${deadlineColor(todo.deadline)} text-xs`}>{dayjs(todo.deadline).format('YYYY年 MM月DD日')}</p>
        }
      </button>
    </>
  )
}
