// STORE TO TODOS REDUCER
import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from "./todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoSliceReducer
  }
})

// export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch