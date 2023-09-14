import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import CheckboxFormInput from './CheckboxFormInput';
import { useState, useContext } from 'react';
import { Toolbar, Typography } from '@mui/material';
import { userContext } from '../contexts/userContext';
import { selectedHallContext } from '../contexts/selectedHallContext';
import { hallDataContext } from '../contexts/hallDataContext';


function BookingForm({seatNum, setOpen})
{
    const [daysChosen, setDaysChosen] = useState([]);
    const [monthsChosen, setMonthsChosen] = useState([]);
    const [dayError, setDayError] = useState(null);
    const [monthError, setMonthError] = useState(null);
    const [response, setResponse] = useState(null);
    const user = useContext(userContext);
    const {setHallData} = useContext(hallDataContext);


    const hallName = useContext(selectedHallContext);
    console.log(user);
    

    const handleDayClick = (i, checked) => {
        if (checked)
        {
            setDaysChosen([...daysChosen, i]);
        }
        else
        {
            setDaysChosen(daysChosen.filter( day => day!== i));
        }
        setDayError(null);
    };

    const handleMonthClick = (i, checked) => {
        if (checked)
        {
            setMonthsChosen([...monthsChosen, i]);
        }
        else
        {
            setMonthsChosen(monthsChosen.filter( month => month!== i));
        }
        setMonthError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("dayset: ", daysChosen);
        console.log("monthset: ", monthsChosen);
        if (daysChosen.length == 0)
        {
            setDayError("Pick at least one day.");
            return;
        }
        else if (monthsChosen.length == 0)
        {
            setMonthError("Pick at least one month.");
            return;
        }
        const url = "http://localhost:5000/halls/" + hallName + "/" + seatNum;
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                username: user,
                days: (daysChosen.length == 7) ? [100] : daysChosen,
                months: (monthsChosen.length == 12) ? [100] : monthsChosen
            }),
            headers: {
                'Content-Type': 'application/json'
              },
        });
        const status = res.status;
        res.text()
        .then(msg => setResponse({msg, status}));   
    }

        const handleCloseResponse = () =>
        {
            setOpen(false); 
            setResponse(null);
            if (response.status == 200)
            {
                setHallData(null);
            }
        };
        
        const dayInputs = ['M', 'T', 'W', 'Th', 'F', 'S', 'S'].map( (day, index) =>
            <CheckboxFormInput id={"d" + index} value={(index==6) ? 0 : index+1} className="weekday" handleClick={handleDayClick} label={day} key={"d" + index} />
        );

        const monthInputs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map( (month, index) => 
            <CheckboxFormInput id={"m" + index} value={index} className="month" handleClick={handleMonthClick} label={month} key={"m" + index} />
        );
        
        if (!response){
        return(
            <div>
                <h1>Book Your Seat</h1>
                <h2>Valid till the end of this year</h2>
                <form onSubmit={handleSubmit}>
                    <fieldset className="weekDays selector" name='days'>
                        <legend>Choose Your Days</legend>
                        {dayInputs}
                    </fieldset>
                    {dayError && <span className='input-error'>{dayError}</span>}
                    <fieldset className="months selector" name='days'>
                        <legend>Choose Your Months</legend>
                        {monthInputs}
                    </fieldset>
                    {monthError && <span className='input-error'>{monthError}</span>}
                    <Toolbar />
                    <Button variant="contained" type='submit' className='booking-button'>Book</Button>
                </form>
            </div>
        );            
        }
        else{
            return (
                <div>
                    <h1>{response.msg}</h1>
                    <Button variant="contained" onClick={handleCloseResponse}>OK</Button>
                </div>
            )
        }

}

export default BookingForm;
