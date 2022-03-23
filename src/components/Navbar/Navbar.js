import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import logo from "../../assets/Babble-Small-Dark.jpg";
import logo2 from "../../assets/Babble-Big-Dark.jpg";
import { useMatchMedia } from "../../helpers/useMatchMedia";
import "./Navbar.css";

export default function ButtonAppBar() {
  const isDesktop = useMatchMedia("(min-width: 969px)", true);
  const isPhone = useMatchMedia("(max-width: 968px)", true);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="appbar">
          {isPhone && <Avatar alt="Babble" src={logo}></Avatar>}
          {isDesktop && <img alt="Babble" src={logo2} />}
          <div>
            {isDesktop && <Button className="btn">Login</Button>}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
