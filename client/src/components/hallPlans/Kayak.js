import HallRow from '../HallRow';

function Kayak()
{
    return (
        <div className='hall'>
            <HallRow totalSeats={10} startSeatNum={1} />
            <HallRow totalSeats={10} startSeatNum={11} />
            <HallRow totalSeats={10} startSeatNum={21} />
            <HallRow totalSeats={10} startSeatNum={31} />
            <HallRow totalSeats={10} startSeatNum={41} />
        </div>
    );
}

export default Kayak;