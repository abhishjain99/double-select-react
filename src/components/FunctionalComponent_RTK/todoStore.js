// STORE TO TODOS REDUCER
import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    todos: todoSliceReducer
  }
})

export default store;