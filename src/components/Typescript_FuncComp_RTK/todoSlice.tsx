// ID: Date.now();
// Slice has application state and associated reducers.
// Contains initial state and how the state should be updated wrt action

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTodoThunk, editTodoThunk, fetchTodosThunk, removeTodoThunk } from "./todoThunk";
import { Todo, TodoState } from './todoInterfaces';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todolist: [],
    editId: null,
    editInput: null,
  } as TodoState,
  reducers: {
    startEdit: (state, action: PayloadAction<Todo>) => {
      state.editId = action.payload.id;
      state.editInput = action.payload.content;
    },
    setEdit: (state, action: PayloadAction<string>) => {
      state.editInput = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodosThunk.fulfilled, (state, action: PayloadAction<Todo[]>) => {
      state.todolist = action.payload;
    })
    .addCase(addTodoThunk.fulfilled, (state, action: PayloadAction<Todo>) => {
      state.todolist = [action.payload, ...state.todolist];
    })
    .addCase(removeTodoThunk.fulfilled, (state, action: PayloadAction<string>) => {
      state.todolist = state.todolist.filter(item => item.id !== action.payload);
    })
    .addCase(editTodoThunk.fulfilled, (state, action: PayloadAction<Todo>) => {
      const existingTodo = state.todolist.find(item => item.id === action.payload.id);
      if(existingTodo) existingTodo.content = action.payload.content;
      // clear edit fields
      state.editId = null;
      state.editInput = null;
    });
  }
});

export const { startEdit, setEdit } = todoSlice.actions;
export default todoSlice.reducer;