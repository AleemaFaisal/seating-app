import { Button } from '@mui/base/Button';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack, setRef } from '@mui/material';
import { BookingModalContext } from '../contexts/BookingModalContext';
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import IconButton from '@mui/material/IconButton';
import { UserContext } from '../contexts/UserContext';
import {HallDisableContext} from '../contexts/HallDisableContext';


function Seat({seatNum, data}){
    const {activeSeat, setActiveSeat} = useContext(BookingModalContext);
    const user = useContext(UserContext);
    const disable = useContext(HallDisableContext);

    //console.log("data for seat ", seatNum, ": " ,data);
    const occupant = data.occupant;
    let seatStyle = "seat";

    const popUpStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    if (!occupant)
    {
        return (
        <>
            <Button disabled={disable} onClick={() => {setActiveSeat( (activeSeat==seatNum) ? null : seatNum)}} className={seatStyle} >
                {(activeSeat == seatNum) ? <TableRestaurantIcon color="secondary" /> : <TableRestaurantOutlinedIcon color="primary" /> }
                <p className='seat-num'>{data.seatNum}</p>
            </Button>
        </>
        )
    }
    else
    {
        return (
            <Tooltip title={occupant}>
                <Button className={seatStyle} disabled >
                    <TableRestaurantIcon color={(occupant == user.name) ? "success" : "primary"} />
                    <p className='seat-num'>{data.seatNum}</p>
                </Button>
            </Tooltip>
        )        
    }
}

export default Seat;