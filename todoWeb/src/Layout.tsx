import React from "react";
import { AppBar, Toolbar, Typography, Paper } from "@material-ui/core";
import "./components/styles.scss";
import AddTodo from "./Features//AddTodo";
import TodoList from "./components/TodoList";

const Layout: React.FC = () => (
  <Paper
    className="main"
    elevation={0}
    style={{ padding: 0, margin: 0, backgroundColor: "#fafafa" }}
  >
    <AppBar color="primary" position="static" style={{ height: 64 }}>
      <Toolbar style={{ height: 64 }}>
        <Typography color="inherit">TODO APP</Typography>
      </Toolbar>
    </AppBar>
    <AddTodo />
    <TodoList />
  </Paper>
);
export default Layout;
