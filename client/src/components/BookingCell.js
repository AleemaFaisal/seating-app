import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';



function BookingCell()
{
    return (
        <TableCell align="center">
                <CircularProgress variant="determinate" value={25} />
                <p>0/55</p>
                <Button variant="outlined" startIcon={<TableRestaurantOutlinedIcon />}>
                    Book Seat
                </Button>
        </TableCell>
    )
}

export default BookingCell;