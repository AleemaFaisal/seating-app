import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function HeaderBar({setUser}) {

  const logout = () => {
    localStorage.removeItem("appJWT");
    localStorage.removeItem("googleToken");
    setUser(null);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            In the Office
          </Typography>
          <Button color="inherit" onClick={logout} >LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}