import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import TodoReducer from "../Features/AddTodoSlice"

export default configureStore({
  reducer: {
    todos: TodoReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
});
