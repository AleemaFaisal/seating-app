import { Paper } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import BookingCell from "./BookingCell";
import { useEffect, useMemo, useState } from "react";
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



function BookingTable()
{
    const [weekNum, setWeekNum] = useState(0);
    const [hallSelection, setHallSelection] = useState(null);
    const [hallsData, setHallsData] = useState(null);
    const dates = useMemo(() => getDates(weekNum), [weekNum]);
    const today = new Date();
    today.setHours(0,0,0,0);

    useEffect(() => {
            let ignore = false;
            const url = BASEURL + "/halls" + "?startDate=" + dates[0] + "&endDate=" + dates[4];
            async function getData () {
                await fetch(url)
                .then(response => response.json())
                .then(data => { 
                    //console.log("data on frontend: ", data);
                    if (!ignore){
                        setHallsData(data);
                    }})
                .catch(err => console.log(err));
            }

            getData();

            return () => {ignore=true;};      
    }, [dates])

    return (
      <div className="booking-pane">
        <TableContainer component={Paper} className="booking-table" style={{ overflowX: "initial" }}>
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
            <p>Choose Your Seat</p>
          </div>
          <Button variant="contained" aria-label="current-week" onClick={()=> setWeekNum(0)}>
            Current Week
          </Button>
        </div>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" className="table-body">
          <TableHead>
            <TableRow>
              <TableCell sx={{background: '#e5e8f1'}}><span className="highlight">Hall</span></TableCell>
              {dates.map((date, i) => 
                  <TableCell align="center" sx={{background: '#e5e8f1'}}> <span className="highlight">{date.substr(0,3)}</span> {date.substr(4,6)}</TableCell>
                )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!hallsData ? "loading..." : hallsData.map((hallData) => (
              <TableRow
                key={hallData[0].hallName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <p className="highlight">{hallData[0].hallName}</p>
                </TableCell>
                {hallData.map((dateEntry, dateNum) => {
                  const disabled = today > new Date(dates[dateNum]);
                  const seatsBooked = dateEntry.totalSeats - dateEntry.numSeatsAvailable;
                  const occupied = Number(seatsBooked/dateEntry.totalSeats)*100;
                  return (
                    <TableCell align="center" className={(today.toDateString() == dates[dateNum]) ? "booking-cell today" : "booking-cell"}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                      <IconButton disabled={disabled} onClick={() => setHallSelection({"hallName": dateEntry.hallName, "date": dates[dateNum]})} aria-label="book" color="white" sx={{ color: "white", backgroundColor: "silver", ':hover': {backgroundColor: '#257CA3'}}}>
                        { disabled ? <NotInterestedOutlinedIcon /> : <TableRestaurantOutlinedIcon /> }
                      </IconButton>
                      { !disabled && "Book Seat"}
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
      </TableContainer>
      {hallSelection && <HallPlanModal hallSelection={hallSelection} setHallSelection={setHallSelection} />}
      </div>
    );
}

export default BookingTable;

