import React, { useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  Box,

} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as actionType from "../../constants/actionTypes";
import { styles } from "./styles";
import AccountMenu from "../AccountMenu/AccountMenu";
import {getUser} from "../../actions/user";

const Navbar = () => {
  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch();
  let location = useLocation();
  const history = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history("/auth");
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (user !== null) {
      if (user.exp * 1000 < new Date().getTime()) logout();
    }
  }, [location]);

  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <Link to="/" sx={styles.brandContainer}>
        <Box
          component="img"
          sx={{
            width: 150,
          }}
          src="/logo2.png"
        />
      </Link>
      <Toolbar sx={{ padding: 0 }}>
        {user !== null ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: '8px' }}>
              <Box
                component="img"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDI0QzE4LjYyNzQgMjQgMjQgMTguNjI3NCAyNCAxMkMyNCA1LjM3MjU4IDE4LjYyNzQgMCAxMiAwQzUuMzcyNTggMCAwIDUuMzcyNTggMCAxMkMwIDE4LjYyNzQgNS4zNzI1OCAyNCAxMiAyNFoiIGZpbGw9IiNDN0JFREMiLz4KPHBhdGggZD0iTTExLjk5OTggMjIuODU5N0MxNy45OTc1IDIyLjg1OTcgMjIuODU5NSAxNy45OTc3IDIyLjg1OTUgMTJDMjIuODU5NSA2LjAwMjM3IDE3Ljk5NzUgMS4xNDAzMiAxMS45OTk4IDEuMTQwMzJDNi4wMDIxOSAxLjE0MDMyIDEuMTQwMTQgNi4wMDIzNyAxLjE0MDE0IDEyQzEuMTQwMTQgMTcuOTk3NyA2LjAwMjE5IDIyLjg1OTcgMTEuOTk5OCAyMi44NTk3WiIgZmlsbD0iIzlDNTVEMiIvPgo8cGF0aCBkPSJNMTIgNC4yNUw0LjUgMTUuNTgzN0w5LjE4ODggMTMuNjkyMUwxMiA5LjQzNzFMMTQuNzk5MyAxMy42NzQ4TDE5LjUgMTUuNTgzN0wxMiA0LjI1WiIgZmlsbD0iI0YwRjhGRiIvPgo8cGF0aCBkPSJNOS4xODg5NiAxMy42OTIxTDEyLjAyNTQgMTcuNzVMMTQuNzk5NSAxMy42NzQ4TDEyLjAyNTQgMTIuNTQ4NUw5LjE4ODk2IDEzLjY5MjFaIiBmaWxsPSIjRjBGOEZGIi8+Cjwvc3ZnPgo="
                sx={{ width: '16px', marginRight: '4px' }}
              />

              <Typography>
                {user.tokens} Pidz
              </Typography>
            </Box>

            <AccountMenu />


          </Box>
        ) : (
          <Button
            to="/auth"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
