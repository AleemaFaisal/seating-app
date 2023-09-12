import HallRow from '../HallRow';

function Edly()
{
    return (
        <div className='edly'>
            <div className='section-1'>
                <HallRow totalSeats={4} startSeatNum={1} />
                <HallRow totalSeats={4} startSeatNum={5} />
            </div>
            <div className='section-2'>
                <HallRow totalSeats={6} startSeatNum={9} />
                <HallRow totalSeats={6} startSeatNum={15} />
            </div>
        </div>
    );
}

export default Edly;