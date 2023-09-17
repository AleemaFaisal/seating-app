import Seat from './Seat';
import { useContext } from 'react';
import { BookingModalContext } from '../contexts/BookingModalContext';

function HallRow({totalSeats, startSeatNum})
{
    const {seatsData} = useContext(BookingModalContext);
    console.log("seatsdata in halrow: ", seatsData);

    const seats = [];
    const seatsPerRow = totalSeats/2;
    for (let i=startSeatNum; i< (startSeatNum+seatsPerRow); i++)
    {
        seats.push(i);
    }
    console.log("seats: ", seats);

    return (
        <div className='row'>
            <div>
                {seats.map( (index) =>
                    <Seat seatNum={index} key={index} data={seatsData[index-1]} />
                )}
            </div>
            <div>
                {seats.map( index =>
                    <Seat seatNum={index + seatsPerRow}  key={index + seatsPerRow} data={seatsData[index+seatsPerRow-1]}/>
                )}
            </div>
        </div>
    )
}

export default HallRow;