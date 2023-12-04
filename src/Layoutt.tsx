import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Route, Routes } from "react-router-dom";
import DialogsContainer from "./components/dialogs/DialogsContainer.tsx";
import ProfileContainer from "./components/profile/myPost/profile/ProfileContainer.jsx";
import { UsersPage } from "./components/users/UsersContainer.tsx";
import Login from "./components/login/Login.tsx";
import ChatPage from "./pages/Chat/ChatPage.tsx";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { label: "Profile", link: "/profile" },
  { label: "Users", link: "/users" },
  { label: "Contact", link: "/dialogs" },
  { label: "Chat", link: "/chat" },
];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <a
            style={{
              textDecoration: "none",
              color: "rgb(1, 41, 112)",
            }}
            href={item.link}
          >
            <ListItem key={item.label} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </a>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <a
                style={{
                  textDecoration: "none",
                  color: "rgb(1, 41, 112)",
                }}
                href={item.link}
              >
                <Button key={item.label} sx={{ color: "#fff" }}>
                  {item.label}
                </Button>
              </a>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" style={{ width: "100%" }} sx={{ p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/dialogs" element={<DialogsContainer />} />
          <Route path="/profile/:userId?" element={<ProfileContainer />} />
          <Route path="/profile" element={<ProfileContainer />} />
          <Route path="/users" element={<UsersPage pageTitle="Самурай" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </Box>
  );
}
