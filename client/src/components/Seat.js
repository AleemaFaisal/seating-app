import { Button } from '@mui/base/Button';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BookingForm from './BookingForm';

function Seat({seatNum, data})
{
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    console.log("data for seat ", seatNum, ": " ,data);
    const available = data.available;
    let seatStyle = "seat rounded-md";
    seatStyle += available ? " border-solid border-teal-300 bg-transparent border-2 hover:bg-teal-100 active:bg-teal-700" :  " bg-teal-300";

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

    if (available)
    {
        return (
        <>
        <Button onClick={handleOpen} className={seatStyle} disabled={!available} >{data.seatNum}</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            classes="form-modal"
        >
            <Box sx={popUpStyle}>
                <BookingForm seatNum={seatNum} hallName='Kayak' setOpen={setOpen} />
            </Box>
        </Modal>
        </>
        )
    }
    else
    {
        return (
            <Tooltip title={data.bookings[0].username}>
                <Button className={seatStyle} disabled={!available}>{data.seatNum}</Button>
            </Tooltip>
        )        
    }

}

export default Seat;