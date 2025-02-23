type Props = {
  todos: ToDo[];
  filter: Filter;
  onTodo: <K extends keyof ToDo, V extends ToDo[K]>(
    id: number,
    key: K,
    value: V
  ) => void;
};
export const TodoItem = (props: Props) => {
  const filteredTodos = props.todos.filter((todo) => {
    if (props.filter === "all") return true;
    if (props.filter === "checked") return todo.checked && !todo.removed;
    if (props.filter === "unchecked") return !todo.checked && !todo.removed;
    if (props.filter === "removed") return todo.removed;
    return true;
  });

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            disabled={todo.removed}
            checked={todo.checked}
            onChange={() => props.onTodo(todo.id, "checked", !todo.checked)}
          />
          <input
            type="text"
            disabled={todo.checked || todo.removed}
            value={todo.value}
            onChange={(e) => props.onTodo(todo.id!, "value", e.target.value)}
          />
          <button
            onClick={() => props.onTodo(todo.id, "removed", !todo.removed)}
          >
            {todo.removed ? "Undo" : "Remove"}
          </button>
        </li>
      ))}
    </ul>
  );
};
