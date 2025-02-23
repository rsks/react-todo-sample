type Props = {
  todos: ToDo[];
  handleEmpty: () => void;
};
export const ActionButton = (props: Props) => {
  return (
    <button
      disabled={props.todos.filter((todo) => todo.removed).length === 0}
      onClick={props.handleEmpty}
    >
      Clear
    </button>
  );
};
