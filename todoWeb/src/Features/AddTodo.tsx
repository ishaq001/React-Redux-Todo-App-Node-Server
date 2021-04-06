import React, { useState } from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addTodo } from "./AddTodoSlice";

const AddTodo: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="Add Todo here"
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            fullWidth
            value={text}
            color="primary"
            variant="outlined"
            onClick={() => {
              dispatch(addTodo({ todo: text, isDone: false }));
              setText("");
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
});
export default AddTodo;
