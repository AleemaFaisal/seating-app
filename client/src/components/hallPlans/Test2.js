import HallRow from '../HallRow';
import {HallDisableContext} from "../../contexts/HallDisableContext";


function Test2({disableBooking})
{
    return (
        <div className='edly'>
            <div className='section-1'>
            <HallDisableContext.Provider value={disableBooking}>
                <HallRow totalSeats={4} startSeatNum={1} />
                <HallRow totalSeats={6} startSeatNum={5} />
                <HallRow totalSeats={10} startSeatNum={11} />
            </HallDisableContext.Provider>
            </div>
        </div>
    );
}

export default Test2;