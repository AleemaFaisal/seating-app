function getUserSeat(user, hallName, date)
{
    const bookings = user.bookings;
    const checkDate = new Date(date);
    for (let booking of bookings)
    {
        const startDate = new Date(booking.startDate);
        const endDate = new Date(booking.endDate);
        if (booking.hallName === hallName && checkDate.getTime() >= startDate.getTime() && checkDate.getTime() <= endDate.getTime())
        {
            return booking.seatNum;
        }
    }
}

export default getUserSeat;