import { useState, useEffect } from "react";
import { FormDialog } from "./FormDialog";
import { ActionButton } from "./ActionButton";
import { SideBar } from "./SideBar";
import { TodoItem } from "./TodoItem";
import { ToolBar } from "./ToolBar";
import { GlobalStyles } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo, pink } from "@mui/material/colors";
import { AlertDialog } from "./AlertDialog";
import localforage from "localforage";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: "#757de8",
      dark: "#002984",
    },
    secondary: {
      main: pink[500],
      light: "#ff6090",
      dark: "#b0003a",
    },
  },
});
export const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };
  const toggleDrawer = () => {
    setDrawerOpen((drawerOpen) => !drawerOpen);
  };
  const toggleDialog = () => {
    setDialogOpen((dialogOpen) => !dialogOpen);
    setText("");
  };
  const toggleAlert = () => {
    setAlertOpen((alertOpen) => !alertOpen);
  };
  const handleSubmit = () => {
    if (!text) {
      setDialogOpen((dialogOpen) => !dialogOpen);
      return;
    }
    const newTodo: ToDo = {
      value: text,
      id: Math.random(),
      checked: false,
      removed: false,
    };
    setTodos((todos) => [newTodo, ...todos]);
    setText("");
    setDialogOpen(!todos);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };
  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };

  const handleToDo = <K extends keyof ToDo, V extends ToDo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) => {
      return todos.map((todo) =>
        todo.id === id ? { ...todo, [key]: value } : todo
      );
    });
  };

  useEffect(() => {
    localforage.getItem("todos").then((value) => {
      if (value) {
        setTodos(value as ToDo[]);
      }
    });
  }, []);

  useEffect(() => {
    localforage.setItem("todos", todos);
  }, [todos]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ToolBar filter={filter} onToggleDrawer={toggleDrawer} />
      <SideBar
        drawerOpen={drawerOpen}
        onFilter={handleFilter}
        onToggleDrawer={toggleDrawer}
      />
      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={toggleAlert}
        onToggleDialog={toggleDialog}
      />
      <FormDialog
        text={text}
        dialogOpen={dialogOpen}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onToggleDialog={toggleDialog}
      />
      <AlertDialog
        alertOpen={alertOpen}
        onEmpty={handleEmpty}
        onToggleAlert={toggleAlert}
      />
      <TodoItem todos={todos} filter={filter} onTodo={handleToDo} />
      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={toggleAlert}
        onToggleDialog={toggleDialog}
      />
    </ThemeProvider>
  );
};
