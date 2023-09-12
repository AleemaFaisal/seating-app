import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {useState} from 'react';
import Header from './Header';
import BookingPanel from './BookingPanel';
import NavBar from './NavBar';
import {selectedHallContext} from '../contexts/selectedHallContext';

const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const [selectedhall, setSelectedHall] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const navProps = {mobileOpen, setMobileOpen, setSelectedHall, drawerWidth, window, handleDrawerToggle};
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} />
      <NavBar {...navProps} />
      {selectedhall ? 
      <selectedHallContext.Provider value={selectedhall} >
          <BookingPanel drawerWidth={drawerWidth} /> 
      </selectedHallContext.Provider>
      : "Select Hall"}
    </Box>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;