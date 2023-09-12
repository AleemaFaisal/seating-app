const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HallSchema = new Schema({
    name: {
        type: String, 
        unique: true
    },
    totalSeats: Number,
    numSeatsAvailable: {
        type: Number,
        default: 0
    },
    seats: [{
        seatNum: Number,
        bookings: [{
            username: String, 
            days: [Number], 
            months: [Number]
        }],
        available: {
            type: Boolean, 
            default: true
        }
    }]
});

HallSchema.methods.getNumSeatsAvailable = function () {
    let numAvailable =0;
    for (let i=0; i<this.seats.length; i++ )
    {
        if (this.checkSeatAvailable(i))
        {
            numAvailable++;
        }
    }
    return numAvailable;
};

HallSchema.methods.checkSeatAvailable = function (seatNum) {
    const bookings = this.seats[seatNum].bookings;
    if (bookings.length > 0)
    {
        const today = new Date();
        const dayFound = bookings.some(booking => booking.days.includes(today.getDay()) || booking.days.includes(100));
        const monthFound = bookings.some(booking => booking.months.includes(today.getMonth()) || booking.months.includes(100));
        return !(dayFound && monthFound);  
    }
    else
    {
        return true;
    }
};

const Hall = mongoose.model('Hall', HallSchema);
module.exports = Hall;