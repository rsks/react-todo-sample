import { useState } from "react";

import "./App.css";

import { FormDialog } from "./FormDialog";
import { ActionButton } from "./ActionButton";
import { SideBar } from "./SideBar";
import { TodoItem } from "./TodoItem";

export const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };

  const handleSubmit = () => {
    if (!text) return;
    const newTodo: ToDo = {
      value: text,
      id: Math.random(),
      checked: false,
      removed: false,
    };
    setTodos((todos) => [newTodo, ...todos]);
    setText("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div>
      <SideBar handleFilter={handleFilter} />
      <ActionButton todos={todos} handleEmpty={handleEmpty} />
      <FormDialog text={text} onSubmit={handleSubmit} onChange={handleChange} />
      <TodoItem todos={todos} filter={filter} onTodo={handleToDo} />
    </div>
  );
};
