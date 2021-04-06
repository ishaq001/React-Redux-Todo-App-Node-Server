import React, { useState } from "react";
import {
  ListItem,
  Checkbox,
  IconButton,
  ListItemSecondaryAction,
  Input,
  Button,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../Features/AddTodoSlice";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Todo} from "../types";

const TodoItem: React.FC<Todo> = ({ _id, todo, isDone }: Todo) => {
  const dispatch = useDispatch();

  const [updateText, setUpdateText] = useState<string>(todo);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  
  const inputChangeHanlder = (e: React.ChangeEvent<HTMLInputElement>) => setUpdateText(e.target.value);

  return (
    <ListItem>
      <Checkbox
        className={isDone ? "todo-text" : ""}
        onClick={() => {
         dispatch(
              updateTodo({ _id: _id, todo: updateText, isDone: !isDone })
            );
        }}
        checked={isDone}
      />
      {showEdit ? (
        <>
          <Input
            type="text"
            placeholder="write todo"
            value={updateText}
            onChange={inputChangeHanlder}
          />
          <Button
            onClick={() => {
                        dispatch(
                  updateTodo({ _id: _id, todo: updateText, isDone: isDone })
                );
              setShowEdit(!showEdit);
            }}
          >
            Update
          </Button>
        </>
      ) : (
        <>
          {isDone ? (
            <>
              <p className={isDone && "todo-text"}>{todo}</p>
              <CheckCircleIcon className="checked-todo" />
            </>
          ) : (
            <p>{todo}</p>
          )}
        </>
      )}
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Delete Todo"
          onClick={() => _id && dispatch(deleteTodo(_id))}
        >
          <DeleteOutlined />
        </IconButton>
        <IconButton
          aria-label="Update Todo"
          onClick={() => setShowEdit(!showEdit)}
        >
          <EditIcon  />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default TodoItem;
