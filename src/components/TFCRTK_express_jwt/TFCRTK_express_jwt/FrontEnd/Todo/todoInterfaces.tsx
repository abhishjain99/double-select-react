export interface Todo {
  id: string,
  content: string
}

export interface TodoState {
  todolist: Todo[],
  editId: string | null,
  editInput: string | null
}