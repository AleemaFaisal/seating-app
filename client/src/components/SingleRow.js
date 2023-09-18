import Seat from './Seat';
import { useContext } from 'react';
import { BookingModalContext } from '../contexts/BookingModalContext';

function SingleRow({totalSeats, startSeatNum})
{
    const {seatsData} = useContext(BookingModalContext);

    const seats = [];
    for (let i=startSeatNum; i<(startSeatNum + totalSeats); i++)
    {
        seats.push(i);
    }

    return (
        <div className='single-row'>
                {seats.map( (index) =>
                    <Seat seatNum={index} key={index} data={seatsData[index-1]} upper={false} />
                )}
        </div>
        );
}

export default SingleRow;