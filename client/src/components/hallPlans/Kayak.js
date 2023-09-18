import HallRow from '../HallRow';
import {HallDisableContext} from "../../contexts/HallDisableContext";


function Kayak({disableBooking})
{
    console.log("reached kayak");
    return (
        <div className='hall'>
            <HallDisableContext.Provider value={disableBooking}>
                <HallRow totalSeats={10} startSeatNum={1} />
                <HallRow totalSeats={10} startSeatNum={11} />
                <HallRow totalSeats={10} startSeatNum={21} />
                <HallRow totalSeats={10} startSeatNum={31} />
                <HallRow totalSeats={10} startSeatNum={41} />
            </HallDisableContext.Provider>

        </div>
    );
}

export default Kayak;