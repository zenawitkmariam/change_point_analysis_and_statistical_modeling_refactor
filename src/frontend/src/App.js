import { useEffect, useState } from "react";
import {
  fetchPrices,
  fetchEvents,
  fetchChangePoints,
  fetchMetrics,
} from "./api";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Dashboard from "./components/Dashboard";
import Events from "./components/Events";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

function App() {
  const [prices, setPrices] = useState([]);
  const [events, setEvents] = useState([]);
  const [changePoints, setChangePoints] = useState([]);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    fetchPrices().then(setPrices);
    fetchEvents().then(setEvents);
    fetchChangePoints().then(setChangePoints);
    fetchMetrics().then(setMetrics);
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNav = (path) => {
    navigate(path);
    handleClose();
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
            onClick={handleMenu}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Brent Oil Market Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: 16 }}>
        <Box sx={{ mb: 2 }}>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleNav("/dashboard")}>
              Dashboard
            </MenuItem>
            <MenuItem onClick={() => handleNav("/events")}>Events</MenuItem>
          </Menu>
        </Box>

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                prices={prices}
                events={events}
                changePoints={changePoints}
                metrics={metrics}
                onFilter={setPrices}
              />
            }
          />
          <Route path="/events" element={<Events events={events} />} />
        </Routes>
      </div>
    </Box>
  );
}

export default App;
