import TodoCreateForm from "./TodoCreateForm";
import TodoList from "./TodoList";

export default function TodosIndexSide() {
  return(
    <>
      <div className="bg-gray-600 py-4 px-2 z-20 absolute right-0 min-h-10/12 w-3/12">
        <div className="mb-8">
          <h3 className="text-center text-2xl">Todoリスト</h3>
        </div>

        <div className="mb-4 flex justify-center">
          <TodoCreateForm />
        </div>

        <div>
          <TodoList />
        </div>
      </div>
    </>
  )
}
