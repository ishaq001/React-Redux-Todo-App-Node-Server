import React, { useEffect } from "react";
import { List, Paper } from "@material-ui/core";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../Features/AddTodoSlice";
import { Todo, UserState } from "../types";

const TodoList: React.FC = React.memo(() => {
  const selectedTodos = useSelector(({ todos }: { todos: UserState }) => todos.todos);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <>
      {selectedTodos.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: "auto" }}>
            {selectedTodos.map((todo: Todo) => (
              <TodoItem
                key={todo._id}
                {...todo}
              />
            ))}
          </List>
        </Paper>
      )}
    </>
  );
});
export default TodoList;
