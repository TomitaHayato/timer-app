import { Modal } from "../../../components/Modal"
import { openModal } from "../../../utils/modelCtl"
import TodoCreateForm from "./TodoCreateForm"

export const TodoCreateFormModalBtn = () => {
  return(
    <>
      <button className="btn bg-sky-200 text-gray-800 rounded-3xl" onClick={() => openModal('todo-create-form')}>
        ＋新規作成
      </button>

      <Modal modalId='todo-create-form'>
        <TodoCreateForm />
      </Modal>
    </>
  )
}
