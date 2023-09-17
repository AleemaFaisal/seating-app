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
import {UserContext} from "../contexts/UserContext";

function HallPlanModal({hallSelection, setHallSelection})
{
    const user = useContext(UserContext);

    const [hallData, setHallData] = useState(null);
    const [activeSeat, setActiveSeat] = useState(null);
    const [response, setResponse] = useState(null);

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
              setHallData(data)
            }})
          .catch(err => console.log(err));
        }

        getData();
       
        return () => {ignore=true; setHallData(null);};
  
      }, [hallSelection]);

      const containedStyle = "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-sghohy-MuiButtonBase-root-MuiButton-root";
      const outlinedStyle = "MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium css-1rwt2y5-MuiButtonBase-root-MuiButton-root";

      if (hallData)
      {
        return (
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
                    <button className={outlinedStyle} onClick={() => sendBooking("month")} style={{textTransform: "none"}} >Entire Month</button>
                    <button className={outlinedStyle} onClick={() => sendBooking("week")} style={{textTransform: "none"}}  >Entire Week</button>
                    <button className={containedStyle} onClick={() => sendBooking("day")} style={{textTransform: "none"}} >Today</button>
                </Stack> }
            </Box>
          </div>
        </Modal>
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