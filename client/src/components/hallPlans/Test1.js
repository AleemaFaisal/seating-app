import HallRow from '../HallRow';

function Test1()
{
    return (
        <div className='edly'>
            <div className='section-1'>
                <HallRow totalSeats={4} startSeatNum={1} />
                <HallRow totalSeats={6} startSeatNum={5} />
            </div>
        </div>
    );
}

export default Test1;