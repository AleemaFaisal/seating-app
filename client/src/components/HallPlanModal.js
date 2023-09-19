import Kayak from "../components/hallPlans/Kayak";
import McKinsey from "../components/hallPlans/McKinsey";
import Edly from "../components/hallPlans/Edly";
import Test1 from "../components/hallPlans/Test1";
import Test2 from "../components/hallPlans/Test2";
import Test3 from "../components/hallPlans/Test3";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useContext, useState, useEffect } from "react";
import {BookingModalContext} from "../contexts/BookingModalContext";
import { BASEURL } from "../constants";
import {UserContext} from "../contexts/UserContext";
import getUserSeat from "../utils/getUserSeat";

function HallPlanModal({hallSelection, setHallSelection, setRefresh})
{
    const user = useContext(UserContext);
    console.log("user: ", user);

    const [hallData, setHallData] = useState(null);
    const [activeSeat, setActiveSeat] = useState(null);
    const [response, setResponse] = useState(null);
    const disableBooking = hallSelection.disableBooking;
    console.log("hall selection: ", hallSelection);

    const getHallPlan = () => {
        switch(hallSelection.hallName){
          case "Kayak": return <Kayak disableBooking={disableBooking} />; break;
          case "Test1": return <Test1 disableBooking={disableBooking} />; break;
          case "Test2": return <Test2 disableBooking={disableBooking} />; break;
          case "Test3": return <Test3 disableBooking={disableBooking} />; break;
          default: return <Test1 disableBooking={disableBooking} />; break;
        }
      };

    const HallPlan =  getHallPlan();  

    const refresh = () => {
      setHallSelection(null);
      setRefresh(r => r+1);
    }

    const popUpStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };

      const sendBooking = async function (option) {
        const url = BASEURL +  "/halls/" + hallSelection.hallName + "/" + activeSeat + "/book";
        await fetch(url, {
          method: "post",
          body: JSON.stringify({
            userEmail: user.email,
            startDateString: hallSelection.date,
            option
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.text())
        .then(msg => {
          console.log("response: ", msg);
          setResponse(msg);
        });
      };

      const cancelBooking = async function () {
        const userSeat = getUserSeat(user, hallSelection.hallName, hallSelection.date);
        console.log("seat found: ", userSeat);
        const url = BASEURL +  "/halls/" + hallSelection.hallName + "/" + userSeat + "/cancel?cancelDate=" + hallSelection.date;
        await fetch(url, {
          method: "post",
          body: JSON.stringify({
            email: user.email,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.text())
        .then(msg => {
          setResponse(msg);
        });
      };


      useEffect(() => {
        console.log("runnning effect");
        let ignore = false;
        const getData = async function () {
          const url = BASEURL + "/halls/" + hallSelection.hallName + "?checkDateString=" + hallSelection.date;
          await fetch(url)
          .then(response => response.json())
          .then(data => { 
            if (!ignore){
              console.log("halldata in modal: ", data);
              setHallData(data)
            }})
          .catch(err => console.log(err));
        }

        getData();
       
        return () => {ignore=true; setHallData(null);};
  
      }, [hallSelection]);

      if (response)
      {
        return (
          <Modal
            open
            onClose={refresh}
            aria-labelledby="booking-response"
            aria-describedby="booking-response"
            classes="form-modal"
        >
            <Box sx={popUpStyle}>
                <p>{response}</p>
                <Button variant="contained" sx={{maxWidth: "40px", minWidth: "40px", margin: "0 auto"}} onClick={() => {setResponse(null); refresh();}} >OK</Button>
            </Box>
        </Modal>
        );
      }
      else if (hallData)
      {
        return (
          <Modal
            open
            onClose={() => setHallData(null)}
            aria-labelledby="booking-hall-plan"
            aria-describedby="booking-hall-plan"
            classes="form-modal"
          >
          <div>
            <Box sx={popUpStyle} className="booking-modal" >
                <h1 className="highlight">{hallSelection.hallName}</h1>
                <p className="small">{hallSelection.date}</p>
                <BookingModalContext.Provider value={{ "seatsData": hallData.seats, activeSeat, setActiveSeat}}>
                {HallPlan}  
                </BookingModalContext.Provider>
                {<p className="small">{disableBooking ? "Cancel Your Existing Bookings on This Date To Book Here" : "Click To Choose Your Seat"}</p>}
                {activeSeat &&
                <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
                    <p className="small no-wrap">Book For</p>
                    <Button variant="outlined" onClick={() => {sendBooking("month");setHallData(null);}} style={{textTransform: "none"}} >Entire Month</Button>
                    <Button variant="outlined" onClick={() => {sendBooking("week"); setHallData(null);}} style={{textTransform: "none"}}  >Entire Week</Button>
                    <Button variant="contained"onClick={() => {sendBooking("day");setHallData(null);}} style={{textTransform: "none"}} >Today</Button>
                </Stack> }
                {hallSelection.userBookedOnSlot &&
                <Button variant="outlined" onClick={cancelBooking}>Cancel Booking</Button>}
            </Box>
          </div>
        </Modal>
        );       
      }
      // else
      // {
      //   return (
      //       <Modal
      //       open
      //       onClose={() => setHallSelection(null)}
      //       aria-labelledby="booking-hall-plan"
      //       aria-describedby="booking-hall-plan"
      //       classes="form-modal"
      //   >
      //       <Box sx={popUpStyle}>
      //           <p>loading...</p>
      //       </Box>
      //   </Modal>
      //   )   
      // }
}

export default HallPlanModal;