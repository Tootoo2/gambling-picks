import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const MyAppBar = ({ toggleDrawer }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setTitle("Home");
    } else {
      const formattedTitle = location.pathname.replace(/[^\w\s]/gi, "");
      const capitalizedTitle =
        formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);
      setTitle(capitalizedTitle);
    }
  }, [location]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button color="inherit" onClick={() => dispatch(signout())}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MyAppBar;
