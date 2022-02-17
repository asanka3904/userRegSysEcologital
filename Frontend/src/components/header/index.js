import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PeopleIcon from "@mui/icons-material/People";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";

import { loginUser, logoutUser } from "../../actions/authAction";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  let navigate = useNavigate();

  const authred = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate("./login");
  };

  const routeChangesignin = () => {
    navigate("./login");
  };
  const routeChangesignup = () => {
    navigate("./register");
  };

  const goprofile = () => {
    navigate("./");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={goprofile}
          >
            <PeopleIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Register System
          </Typography>

          {authred.isAuthenticated ? (
            <Button color="inherit" onClick={logout} endIcon={<LockIcon />}>
              Sign out
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={routeChangesignin}
              endIcon={<LoginIcon />}
            >
              Signin
            </Button>
          )}

          <Button
            color="inherit"
            onClick={routeChangesignup}
            endIcon={<AppRegistrationIcon />}
          >
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
