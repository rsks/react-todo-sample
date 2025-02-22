import { useState } from "react";

import "./App.css";

type ToDo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};
type Filter = "all" | "checked" | "unchecked" | "removed";
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

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "checked") return todo.checked && !todo.removed;
    if (filter === "unchecked") return !todo.checked && !todo.removed;
    if (filter === "removed") return todo.removed;
    return true;
  });

  return (
    <div>
      <select
        defaultValue="all"
        onChange={(e) => handleFilter(e.target.value as Filter)}
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>
      {filter === "removed" ? (
        <button
          disabled={todos.filter((todo) => todo.removed).length === 0}
          onClick={() => handleEmpty()}
        >
          Clear
        </button>
      ) : (
        filter !== "checked" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input type="text" value={text} onChange={(e) => handleChange(e)} />
            <input type="submit" value="Add" onSubmit={handleSubmit} />
          </form>
        )
      )}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              disabled={todo.removed}
              checked={todo.checked}
              onChange={() => handleToDo(todo.id, "checked", !todo.checked)}
            />
            <input
              type="text"
              disabled={todo.checked || todo.removed}
              value={todo.value}
              onChange={(e) => handleToDo(todo.id!, "value", e.target.value)}
            />
            <button
              onClick={() => handleToDo(todo.id, "removed", !todo.removed)}
            >
              {todo.removed ? "Undo" : "Remove"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
