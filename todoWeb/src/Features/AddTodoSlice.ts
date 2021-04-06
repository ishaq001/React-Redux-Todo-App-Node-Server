import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Todo, UserState } from "../types";

//getTodoCall
export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  return fetch("http://localhost:5000/todos")
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err.message);
});

//addTodoCall
export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (todo: Todo) => {
    const res = await fetch("http://localhost:5000/todos", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: todo.todo, isDone: todo.isDone }),
    });
    return await res.json();
  }
);
//updateTodoCall
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todo: Todo) => {
    const res = await fetch(`http://localhost:5000/todos/${todo._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: todo.todo, isDone: todo.isDone }),
    });
    return await res.json();
  }
);

//deleteTodoCall
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }
);

const initialState: UserState = {
  todos: [],
  status: "idle",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getTodoReducers
      .addCase(getTodos.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = "succeed";
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = "failed";
      })

      //addTodoReducers
      .addCase(addTodo.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.status = "succeed";
        state.todos = [action.payload, ...state.todos];
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = "failed";
      })

      //deleteTodoReducers
      .addCase(deleteTodo.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.status = "succeed";
        state.todos = state.todos.filter(
          (todo) => todo._id !== action.payload._id
        );
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed";
      })

      //updateTodoReducers
      .addCase(updateTodo.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(
        updateTodo.fulfilled,
        (state, { payload }) => {
          state.status = "succeed";
          const existingpost = state.todos.find(
            (todo) => todo._id === payload._id
          );
          if (existingpost) {
            existingpost.todo = payload.todo;
            existingpost.isDone = payload.isDone;
          }
        }
      )
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default todoSlice.reducer;
