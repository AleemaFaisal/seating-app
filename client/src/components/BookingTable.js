import { Paper } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import BookingCell from "./BookingCell";
import { useContext, useEffect, useMemo, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import {getDates, getMonth} from '../utils/getDates';
import HallPlanModal from "./HallPlanModal";
import { BASEURL } from "../constants";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { UserContext } from "../contexts/UserContext";



function BookingTable()
{
    const [weekNum, setWeekNum] = useState(0);
    const [hallSelection, setHallSelection] = useState(null);
    const [hallsData, setHallsData] = useState(null);
    const [userBookings, setUserBookings] = useState(null);
    const dates = useMemo(() => getDates(weekNum), [weekNum]);
    const user = useContext(UserContext);
    const today = new Date();
    today.setHours(0,0,0,0);

    
    useEffect(() => {
            let ignore = false;
            const url = BASEURL + "/halls" + "?startDate=" + dates[0] + "&endDate=" + dates[4];
            async function getData () {
                await fetch(url)
                .then(response => response.json())
                .then(data => { 
                    console.log("data on frontend: ", data);
                    if (!ignore){
                        setHallsData(data);
                    }})
                .catch(err => console.log(err));
            }

            getData();

            return () => {ignore=true;};      
    }, [dates]);

    useEffect(() => {
      let ignore = false;
      const url = BASEURL + "/user" + "/" + user.email + "/week-bookings?startDate=" + dates[0];
      async function getData () {
          await fetch(url)
          .then(response => response.json())
          .then(data => { 
            console.log("userdata: ", data);
              if (!ignore){
                  setUserBookings(data);
              }})
          .catch(err => console.log(err));
      }

      getData();

      return () => {ignore=true;};      
}, [dates]);

    return (
      <Paper className="booking-pane">
        <div className="navigation">
          <div className="buttons">
          <Button variant="contained" aria-label="prev-week" onClick={()=> setWeekNum(w => w-1)} >
            <NavigateBeforeIcon fontSize="inherit" />   
          </Button>
          <Button variant="contained" aria-label="next-week"  onClick={()=> setWeekNum(w => w+1)} >
            <NavigateNextIcon fontSize="inherit" />   
          </Button>
          </div>
          <div className="title-text">
            <h1>{dates[0].substring(3,10)}  -  {dates[4].substring(3,10)}</h1>
            <p className="small">Choose Your Seat</p>
          </div>
          <Button variant="contained" aria-label="current-week" onClick={()=> setWeekNum(0)}>
            Current Week
          </Button>
        </div>
        <div className="booking-table">
        <Table stickyHeader={true} sx={{ minWidth: 650 }} aria-label="simple table" className="table-body">
          <TableHead>
            <TableRow>
              <TableCell sx={{background: '#e5e8f1'}}><span className="titles">Hall</span></TableCell>
              {dates.map((date, i) => 
                  <TableCell align="center" sx={{background: '#e5e8f1'}}> <span className="titles">{date.substr(0,3)}</span> {date.substr(4,6)}</TableCell>
                )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!hallsData ? "loading..." : hallsData.map((hallData) => (
              <TableRow
                key={hallData[0].hallName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" >
                  <p className="titles">{hallData[0].hallName}</p>
                </TableCell>
                {hallData.map((dateEntry, dateNum) => {
                  const datePassed = today > new Date(dates[dateNum]);
                  const seatsBooked = dateEntry.totalSeats - dateEntry.numSeatsAvailable;
                  const occupied = Number(seatsBooked/dateEntry.totalSeats)*100;
                  const userBookedOnDate = userBookings.some(booking => booking.date == dates[dateNum]); //disable additional bookings for this day
                  const userBookedOnSlot = userBookings.some(booking => booking.hall == dateEntry.hallName && booking.date == dates[dateNum]);
                  const bgColor = userBookedOnSlot ? "green" : "silver";
                  return (
                    <TableCell align="center" className={(today.toDateString() == dates[dateNum]) ? "booking-cell today" : "booking-cell"}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                      <IconButton disabled={datePassed} onClick={() => setHallSelection({"hallName": dateEntry.hallName, "date": dates[dateNum], "disableBooking": userBookedOnSlot})} aria-label="book" color="white" sx={{ color: "white", backgroundColor: bgColor, ':hover': {backgroundColor: '#257CA3'}}}>
                        { datePassed ? <NotInterestedOutlinedIcon /> : <TableRestaurantOutlinedIcon /> }
                      </IconButton>
                      { (!datePassed) ? (userBookedOnDate) ? "View Details" : "Book Seat" : "" }
                      <LinearProgress variant="determinate" value={occupied} sx={{ width: "45%", marginRight: "4px", borderRadius: "5px" }} />
                      {seatsBooked}/{dateEntry.totalSeats}
                    </Stack>
                  </TableCell>
                  )
                } 
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {hallSelection && <HallPlanModal hallSelection={hallSelection} setHallSelection={setHallSelection} />}
      </Paper>
    );
}

export default BookingTable;

