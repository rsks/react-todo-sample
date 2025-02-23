import {
  AppBar,
  IconButton,
  Box,
  Icon,
  Typography,
  Toolbar,
} from "@mui/material";
type Props = {
  filter: Filter;
  onToggleDrawer: () => void;
};
const translator = (arg: Filter) => {
  switch (arg) {
    case "all":
      return "全てのタスク";
    case "unchecked":
      return "現在のタスク";
    case "checked":
      return "完了したタスク";
    case "removed":
      return "ゴミ箱";
    default:
      return "TODO";
  }
};

export const ToolBar = (props: Props) => {
  return (
    <Box sx={{ flexGlow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-label="menu-button"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={props.onToggleDrawer}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography> {translator(props.filter)} </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
