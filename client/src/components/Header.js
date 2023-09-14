import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function Header({handleDrawerToggle})
{
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem('appJWT');
    //     if (!token)
    //     {
    //         console.log("token not found in effect");
    //         setUser(null);
    //         navigate('/login');
    //     }
    //   });

    return (
        <AppBar
        position="absolute"
        sx={{ zIndex: 1400}}
        >
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
        >
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
            Arbisoft - In the Office
        </Typography>
        </Toolbar>
        </AppBar>
    )
};

export default Header;