import HallRow from '../HallRow';

function Test3()
{
    return (
        <div className='edly'>
            <div className='section-1'>
                <HallRow totalSeats={4} startSeatNum={1} />
                <HallRow totalSeats={6} startSeatNum={5} />
                <HallRow totalSeats={20} startSeatNum={11} />
            </div>
        </div>
    );
}

export default Test3;