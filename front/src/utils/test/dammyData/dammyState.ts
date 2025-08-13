import type { SessionState, User } from "../../../features/session/types/session"
import type { Todo, Todos, TodosState } from "../../../features/todos/types/todoType"

const _createDammyUser = (userStatus?: User): User => {
  return {
    name: userStatus?.name || "User1",
    email: userStatus?.email || "test@example.com",
  }
}

export const loggedInSessionState = (): SessionState => {
  return {
    user: _createDammyUser(),
    isAuthenticated: true,
    loading: false,
    error: null,
  }
}

const _createDammyTodo = (isCompleted: boolean): Todo => {
  const todo: Todo = {
    id: crypto.randomUUID(),
    title: "",
    isCompleted: isCompleted,
  }

  if (isCompleted) {
    todo.title = "TodoUncompleted";
    todo.deadline = new Date();
  } else {
    todo.title = "TodoCompleted";
    todo.completedAt = new Date()
  }

  return todo
}

const _createDammyTodos = (): Todos => [
  _createDammyTodo(true),
  _createDammyTodo(false),
]

export const dammyTodosState = (): TodosState => {
  return {
    todos: _createDammyTodos(),
    loading: false,
    error: null,
  }
}