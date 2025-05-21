import TodoItem from "./TodoItem"

const todos = [
  {title: 'Todo1'},
  {title: 'Todo2'},
  {title: 'Todo3'},
]

export default function TodoList() {
  return(
    <>
      <ul className="list rounded-box shadow-md w-full bg-gray-700">
        { todos.map((todo, index: number) => <TodoItem title={todo.title} index={index + 1} />) }
      </ul>
    </>
  )
}
