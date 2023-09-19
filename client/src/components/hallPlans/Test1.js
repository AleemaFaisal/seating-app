import HallRow from '../HallRow';
import {HallDisableContext} from "../../contexts/HallDisableContext";


function Test1({disableBooking})
{
    return (
        <div className='edly'>
            <div className='section-1'>
            <HallDisableContext.Provider value={disableBooking}>
                <HallRow totalSeats={4} startSeatNum={1} />
                <HallRow totalSeats={6} startSeatNum={5} />
            </HallDisableContext.Provider>
            </div>
        </div>
    );
}

export default Test1;