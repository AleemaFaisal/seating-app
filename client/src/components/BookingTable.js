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



function BookingTable()
{
    const [weekNum, setWeekNum] = useState(0);
    const [hallSelection, setHallSelection] = useState(null);
    const [hallsData, setHallsData] = useState(null);
    const dates = useMemo(() => getDates(weekNum), [weekNum]);
    const today = new Date();

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
        <div className="navigation">
        </div>
        <TableContainer component={Paper} className="booking-table">
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><span className="highlight">Hall</span></TableCell>
              {dates.map((date, i) => 
                  <TableCell align="center"> <span className="highlight">{date.substr(0,3)}</span> {date.substr(4,6)}</TableCell>
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
                  {hallData[0].hallName}
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

