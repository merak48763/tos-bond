import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Tabs,
  Tab
} from "@mui/material";

const NavBar = () => {
  const location = useLocation();
  const tabIndex =
    location.pathname === "/ability" ? 0
    : location.pathname === "/condition" ? 1
    : false;
  return (
    <AppBar position="sticky" color="inherit">
      <Tabs value={tabIndex} variant="fullWidth">
        <Tab label="搜尋技能" component={Link} to="/ability" />
        <Tab label="搜尋倉管" component={Link} to="/condition" />
      </Tabs>
    </AppBar>
  );
}

export default NavBar;
