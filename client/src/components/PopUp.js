import { Children } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


function PopUp({title, description, open, handleClose})
{
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

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={title}
        aria-describedby={description}
        >
            <Box sx={popUpStyle}>
                {Children}
            </Box>
        </Modal>
    );
}

export default PopUp;