import Seat from './Seat';
import { useContext } from 'react';
import { BookingModalContext } from '../contexts/BookingModalContext';

function HallRow({totalSeats, startSeatNum, vertical})
{
    const {seatsData} = useContext(BookingModalContext);

    const seats = [];
    const seatsPerRow = totalSeats/2;
    for (let i=startSeatNum; i< (startSeatNum+seatsPerRow); i++)
    {
        seats.push(i);
    }

    return (
        <div className={vertical ? "vertical-section row" : "row"}>
            <div className={vertical ? "vertical-row v1" : ""}>
                {seats.map( (index) =>
                    <Seat seatNum={index} key={index} data={seatsData[index-1]} upper={true} />
                )}
            </div>
            <div className={vertical ? "vertical-row" : ""}>
                {seats.map( index =>
                    <Seat seatNum={index + seatsPerRow}  key={index + seatsPerRow} data={seatsData[index+seatsPerRow-1]} upper={false} />
                )}
            </div>
        </div>
    )
}

export default HallRow;