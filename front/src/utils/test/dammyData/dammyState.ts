import type { SessionState, User } from "../../../types/session"
import { defaultSetting } from "../../../features/setting/defaultSetting"
import type { Todo, Todos, TodosState } from "../../../types/todoType"

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

export const userDataFromAPI = () => {
  return {
    name: "test",
    email: "email@test.com",
    setting: defaultSetting(),
    todos: [],
  }
}
