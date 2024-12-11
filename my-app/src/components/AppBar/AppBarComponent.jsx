import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { logout } from "../../services/authService";

function AppBarComponent({ user }) {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#4169E1" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {user ? `${user} To-Do List` : "User To-Do List"}
                </Typography>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={logout}
                    startIcon={<Logout />}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default AppBarComponent;