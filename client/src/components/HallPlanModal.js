import Kayak from "../components/hallPlans/Kayak";
import McKinsey from "../components/hallPlans/McKinsey";
import Edly from "../components/hallPlans/Edly";
import Test1 from "../components/hallPlans/Test1";
import Test2 from "../components/hallPlans/Test2";
import Test3 from "../components/hallPlans/Test3";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from '@mui/base/Button';
import { Stack } from '@mui/material';
import { useContext, useState, useEffect } from "react";
import {BookingModalContext} from "../contexts/BookingModalContext";
import { BASEURL } from "../constants";

function HallPlanModal({hallSelection, setHallSelection})
{
    console.log("reached hallplanmodal");
    const [hallData, setHallData] = useState(null);
    const [activeSeat, setActiveSeat] = useState(null);
    const [response, setResponse] = useState(null);

    console.log("hallselection: ", hallSelection);

    const getHallPlan = () => {
        switch(hallSelection.hallName){
          case "Kayak": return <Kayak />; break;
          case "Test1": return <Test1 />; break;
          case "Test2": return <Test2 />; break;
          case "Test3": return <Test3 />; break;
        }
      };

    const HallPlan =  getHallPlan();  

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

      const sendBooking = async function (option) {
        const url = BASEURL +  "/halls/" + hallSelection.hallName + "/" + activeSeat;
        await fetch(url, {
          method: "post",
          body: JSON.stringify({
            userEmail: "aleema.faisal@arbisoft.com",
            startDateString: hallSelection.date,
            option
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          setResponse(res);
          setHallSelection(null);
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
              setHallData(data[0])
            }})
          .catch(err => console.log(err));
        }

        getData();
       
        return () => {ignore=true; setHallData(null);};
  
      }, [hallSelection])

      if (hallData)
      {
        return (
          <>
            <Modal
            open
            onClose={() => setHallSelection(null)}
            aria-labelledby="booking-hall-plan"
            aria-describedby="booking-hall-plan"
            classes="form-modal"
        >
          <div>
            <Box sx={popUpStyle}>
                <BookingModalContext.Provider value={{ "seatsData": hallData.seats, activeSeat, setActiveSeat}}>
                {HallPlan}  
                </BookingModalContext.Provider>
                {activeSeat &&
                <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
                    <Button variant="outlined" onClick={() => sendBooking("month")} >Entire Month</Button>
                    <Button variant="outlined" onClick={() => sendBooking("week")}  >Entire Week</Button>
                    <Button variant="contained" onClick={() => sendBooking("day")} >Today</Button>
                </Stack> }
            </Box>
            </div>
        </Modal>
        <Modal
            open={response}
            aria-labelledby="booking-status"
            aria-describedby="booking-status"
            classes="form-modal"
        >
            <Box sx={popUpStyle}>
              <h1>{response}</h1>
              <Button variant="contained" onClick={() => setResponse(null)}>OK</Button>
            </Box>
        </Modal>
        </>
        
        );       
      }
      else
      {
        return (
            <Modal
            open
            onClose={() => setHallSelection(null)}
            aria-labelledby="booking-hall-plan"
            aria-describedby="booking-hall-plan"
            classes="form-modal"
        >
            <Box sx={popUpStyle}>
                loading...
            </Box>
        </Modal>
        )   
      }



}

export default HallPlanModal;