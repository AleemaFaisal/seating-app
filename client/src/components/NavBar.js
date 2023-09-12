import Box from '@mui/material/Box';
import NavList from './NavList';
import Drawer from '@mui/material/Drawer';
import {useState, useEffect} from 'react';

function  NavBar({mobileOpen, setMobileOpen, setSelectedHall, drawerWidth, window, handleDrawerToggle})
{
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
        <NavList setSelectedHall={setSelectedHall} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
        <NavList setSelectedHall={setSelectedHall} />
        </Drawer>
      </Box>
    );
}

export default NavBar;