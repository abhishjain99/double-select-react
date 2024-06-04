// ASYNC THUNKS FOR CRUD OPERATIONS
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTodos, createTodo, deleteTodo, updateTodo } from "../../APIs/todoAPIs";

export const fetchTodosThunk = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const response = await getTodos()
    return response.reverse();
  } catch(error) {
    throw Error('Failed to fetch todos');
  }
})

export const addTodoThunk = createAsyncThunk('todos/addTodo', async (newTodo) => {
  try {
    const response = await createTodo(newTodo);
    return response;
  } catch(error) {
    throw Error('Failed to add todos');
  }
});

export const removeTodoThunk = createAsyncThunk('todos/removeTodo', async (id) => {
  try {
    await deleteTodo(id);
    return id;
  } catch(error) {
    throw Error('Failed to remove todos');
  }
});

export const editTodoThunk = createAsyncThunk('todos/editTodo', async ({id, content}) => {
  try {
    await updateTodo(id, {content});
    return {id, content};
  } catch(error) {
    throw Error('Failed to edit todos');
  }
});