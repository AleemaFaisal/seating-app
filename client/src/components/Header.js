import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';


function Header({handleDrawerToggle})
{
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