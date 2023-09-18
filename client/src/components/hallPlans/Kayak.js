import HallRow from '../HallRow';
import SingleRow from '../SingleRow';
import {HallDisableContext} from "../../contexts/HallDisableContext";


function Kayak({disableBooking})
{
    console.log("reached kayak");
    return (
        <div className='kayak hall'>
            <HallDisableContext.Provider value={disableBooking}>
                <div className='k k1'>
                    <HallRow totalSeats={10} startSeatNum={1} />
                    <HallRow totalSeats={10} startSeatNum={11} />
                    <HallRow totalSeats={10} startSeatNum={21} />
                    <HallRow totalSeats={10} startSeatNum={31} />
                </div>
                <div className='k k2'>
                    <HallRow totalSeats={8} startSeatNum={41} />
                    <HallRow totalSeats={8} startSeatNum={49} />
                    <HallRow totalSeats={8} startSeatNum={57} />
                    <HallRow totalSeats={8} startSeatNum={65} />
                </div>
                <div className='k k3'>
                    <HallRow totalSeats={8} startSeatNum={73} />
                    <SingleRow startSeatNum={81} totalSeats={3} />
                    <HallRow totalSeats={8} startSeatNum={84} />
                </div>
                <div className='k k4'>
                    <HallRow totalSeats={8} startSeatNum={92} />
                    <SingleRow startSeatNum={100} totalSeats={4} upper={false} />
                    <HallRow totalSeats={8} startSeatNum={104} />
                    <HallRow totalSeats={8} startSeatNum={112} />
                </div>
                <div className='k k5'>
                    <HallRow totalSeats={8} startSeatNum={120} vertical={true} />
                    <HallRow totalSeats={8} startSeatNum={128} vertical={true} />
                </div>
                
               
            </HallDisableContext.Provider>

        </div>
    );
}

export default Kayak;