import {
  AppBar,
  Toolbar,
  Typography
} from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          神魔之塔 羈絆檢視器
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;