const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HallSchema = new Schema({
    hallName: {
        type: String, 
        unique: true
    },
    totalSeats: Number,
    numSeatsAvailable: Number,
    seats: [{
        seatNum: Number,
        bookings: [{
            username: String,
            startDate: String,
            endDate: String
        }],
        occupant: {
            type: String, 
            default: ""
        }
    }]
});

HallSchema.methods.getNumSeatsAvailable = function (checkDateString) {
    let numAvailable =0;
    for (let i=0; i<this.seats.length; i++ )
    {
        if (!this.getOccupant(i, checkDateString))
        {
            numAvailable++;
        }
    }
    return numAvailable;
};

HallSchema.methods.getOccupant = function (seatNum, checkDateString) {
    let checkDate = new Date(checkDateString);
    checkDate = checkDate.getTime();
    const bookings = this.seats[seatNum].bookings;
    let occupant = "";
    for (let booking of bookings)
    {
        let startDate = new Date(booking.startDate);
        startDate = startDate.getTime();
        let endDate  = new Date(booking.endDate);
        endDate = endDate.getTime();
        if (checkDate >= startDate && checkDate <= endDate)
        {
            occupant = booking.username;
        }
    }
    return occupant;
};

HallSchema.pre("find", async function (next, options) {
    const checkDateString = this.options.checkDateString;
    const doc = await this.model.findOne(this.getQuery());
    doc.seats.forEach((seat, seatNum) => {doc.seats[seatNum].occupant = doc.getOccupant(seatNum, checkDateString)});
    doc.numSeatsAvailable = doc.getNumSeatsAvailable(checkDateString);
    await doc.save();
    next();
})

const Hall = mongoose.model('Hall', HallSchema);
module.exports = Hall;