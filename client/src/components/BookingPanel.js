import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Kayak from './hallPlans/Kayak';
import Edly from './hallPlans/Edly';
import McKinsey from './hallPlans/McKinsey';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useMemo, useContext } from 'react';
import {hallDataContext} from '../contexts/hallDataContext';
import { selectedHallContext } from '../contexts/selectedHallContext';

function BookingPanel({drawerWidth})
{
    const [hallData, setHallData] = useState(null);
    const getHallPlan = () => {
      switch(selectedhall){
        case "Kayak": return <Kayak />;
        case "McKinsey": return <McKinsey />;
        case "edly": return <Edly />;
      }
    };

    const selectedhall = useContext(selectedHallContext);

    const Hall = getHallPlan();

    useEffect(() => {
      let ignore = false;
      const url = "http://localhost:5000/halls/" + selectedhall;
      fetch(url)
      .then(response => response.json())
      .then(data => { if (!ignore)
        {setHallData(data)}})
      .catch(err => console.log(err));

      return () => {ignore=true; setHallData(null);};

    }, [selectedhall])
    
    return (
        <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
        <Toolbar />
        {hallData && 
        <hallDataContext.Provider value={{seatsData:hallData.seats, setHallData: setHallData}} >
          {Hall}
        </hallDataContext.Provider>
        }
      </Box>
    )

}

export default BookingPanel;