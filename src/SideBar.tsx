import {
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import { Avatar } from "@mui/material";
import { indigo, pink, lightBlue } from "@mui/material/colors";
import { Icon } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";

import pjson from "../package.json";

type Props = {
  drawerOpen: boolean;
  onToggleDrawer: () => void;
  onFilter: (filter: Filter) => void;
};

const DrawerList = styled("div")(() => ({
  width: 250,
}));
const DrawerHeader = styled("div")(() => ({
  height: 150,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "1em",
  backgroundColor: indigo[500],
  color: "#ffffff",
  fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
}));

const DrawerAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: pink[500],
  width: theme.spacing(6),
  height: theme.spacing(6),
}));

export const SideBar = (props: Props) => {
  return (
    <Drawer open={props.drawerOpen} onClose={props.onToggleDrawer}>
      <DrawerList role="presentation" onClick={props.onToggleDrawer}>
        <DrawerHeader>
          <DrawerAvatar>
            <Icon> create </Icon>
          </DrawerAvatar>
          <p> TODO v{pjson.version}</p>
        </DrawerHeader>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              aria-label="list-all"
              onClick={() => props.onFilter("all")}
            >
              <ListItemIcon>
                <Icon>subject</Icon>
              </ListItemIcon>
              <ListItemText primary="全てのタスク" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              aria-label="list-all"
              onClick={() => props.onFilter("unchecked")}
            >
              <ListItemIcon>
                <Icon sx={{ color: lightBlue[500] }}>
                  radio_button_unchecked
                </Icon>
              </ListItemIcon>
              <ListItemText primary="現在のタスク" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              aria-label="list-all"
              onClick={() => props.onFilter("checked")}
            >
              <ListItemIcon>
                <Icon sx={{ color: pink.A200 }}>check_circle_outline</Icon>
              </ListItemIcon>
              <ListItemText primary="完了したタスク" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              aria-label="list-all"
              onClick={() => props.onFilter("removed")}
            >
              <ListItemIcon>
                <Icon>delete</Icon>
              </ListItemIcon>
              <ListItemText primary="ゴミ箱" />
            </ListItemButton>
          </ListItem>
        </List>
      </DrawerList>
    </Drawer>
  );
};
