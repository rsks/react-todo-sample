type Props = {
  text: string;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormDialog = (props: Props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit();
      }}
    >
      <input type="text" value={props.text} onChange={props.onChange} />
      <input type="submit" value="Add" onSubmit={props.onSubmit} />
    </form>
  );
};
