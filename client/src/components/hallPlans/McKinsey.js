import HallRow from '../HallRow';

function McKinsey()
{
    return (
        <div className="McKinsey">
            <HallRow totalSeats={10} startSeatNum={1} />
            <HallRow totalSeats={6} startSeatNum={11} />
            <HallRow totalSeats={6} startSeatNum={17} />
            <HallRow totalSeats={8} startSeatNum={23} />
        </div>
    )
}

export default McKinsey;