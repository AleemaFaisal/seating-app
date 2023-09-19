const express = require('express');
const router = express.Router();

const Hall = require('../models/HallSchema');
const User = require('../models/UserSchema');

router.get('/', async (req, res) => { //2d array: each row for one hall, each item in the row for data on that date
    const startDateString = decodeURI(req.query.startDate);
    const endDateString = decodeURI(req.query.endDate);
    console.log("start date: ", startDateString);
    console.log("enddate: ", endDateString);

    let checkDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    let dateWiseData = [];

    while (checkDate.getTime() <= endDate.getTime())
    {
        let checkDateString = checkDate.toDateString();
        let hallDocs = await Hall.find({}, "hallName totalSeats numSeatsAvailable seats", {checkDateString: checkDateString} ).exec();
        hallDocs.forEach(doc => doc.numSeatsAvailable = doc.getNumSeatsAvailable(checkDateString));
        dateWiseData.push(hallDocs);
        checkDate.setDate(checkDate.getDate() + 1);
    }
    const hallWiseData = [];
    for (let hallNum=0; hallNum < dateWiseData[0].length; hallNum++) //for each hall
    {
        hallWiseData.push([]);
        for (let dateNum =0; dateNum < dateWiseData.length; dateNum++)
        {
            hallWiseData[hallNum].push(dateWiseData[dateNum][hallNum]);
        }
    }
    res.status(200).send(hallWiseData);
});

router.get('/:hallName', async (req,res) => {
    const checkDateString = decodeURI(req.query.checkDateString);
    const hallName = req.params.hallName;
    const doc = await Hall.findOne({hallName}, "-_id", {checkDateString}).exec();
    console.log("doc: ", doc);
    doc.numSeatsAvailable = doc.getNumSeatsAvailable(checkDateString);
    doc.seats.forEach((seat, seatNum) => {doc.seats[seatNum].occupant = doc.getOccupant(seatNum, checkDateString)});

    
    if (!doc)
    {
        res.status(400).send('no hall found with required name');
    }
    else
    {        
      res.status(200).send(doc);
    }
})

router.post('/:hallName/:seatNum/book', async (req,res) => {
    const {userEmail, startDateString, option} = req.body;
    const {hallName, seatNum} = req.params;

    const hall = await Hall.findOne({hallName}).exec();
    const user = await User.findOne({email: userEmail}).exec()

    if (!hall){
        res.status(400).send("error - hall not found");
    }
    else if (!user){
        res.status(400).send("error- user not found");
    }

    const reqStartDate = new Date(startDateString);
    let reqEndDate;
    switch(option)
    {
        case "day": reqEndDate = new Date(startDateString); break;
        case "week": reqEndDate = new Date(reqStartDate.getFullYear(),reqStartDate.getMonth(),reqStartDate.getDate() + (5-reqStartDate.getDay())); break;
        case "month": reqEndDate = new Date(reqStartDate.getFullYear(), reqStartDate.getMonth()+1, 0); break;
    }

    //find clashing bookings
    // const seatBookings = hall.seats[seatNum-1].bookings;
    // let clashes = [];
    // for (let entry of seatBookings)
    // {
    //     let start = new Date(entry.startDate);
    //     let end = new Date(entry.endDate);
    //     if (start.getTime() >= reqStartDate.getTime() && start.getTime()<= reqEndDate.getTime())
    //     {
    //         clashes.push({entry, "clash": "start"});
    //     }
    //     else if (end.getTime() >= reqStartDate.getTime() && end<=reqEndDate.getTime())
    //     {
    //         clashes.push({entry, "clash": "end"});
    //     }
    // }

    // let clashStart = new Date(clashes[0].entry.startDate);
    // let clashEnd = new Date(clashes[0].entry.endDate);
    // let flag = clashes[0].clash;
    // switch(flag){
    //         case "start": 
    //             reqEndDate.setDate(clashStart.getDate()-1);
    //             break;
    //         case "end":  
    //             reqStartDate.setDate(clashEnd.getDate()+1);
    //             break;
    // }

    const endDateString = reqEndDate.toDateString();

    let booking = {
        username: user.name,
        startDate: startDateString,
        endDate: endDateString
    }

    // console.log("booking calculated: ", booking);
    // res.status(200).send("ok");
    hall.seats[seatNum-1].bookings.push(booking);
    await hall.save()
    .catch(err => res.status(500).send(err));

    booking = {
        hallName,
        seatNum,
        startDate: startDateString,
        endDate: endDateString
    };

    user.bookings.push(booking);
    await user.save()
    .catch(err => res.status(500).send(err));

    res.status(200).send("Booking Saved");
})

router.post('/:hallName/:seatNum/cancel', async (req,res) => {
    const cancelDate = decodeURI(req.query.cancelDate);
    const {hallName, seatNum} = req.params;
    const userEmail = req.body.email;
    const hall = await Hall.findOne({hallName}).exec();
    const user = await User.findOne({email: userEmail}).exec();
    let checkDate = new Date(cancelDate);
    console.log("checkdate: ", checkDate.toDateString());
    let bookingStart = new Date();
    let bookingEnd = new Date();
    console.log("hall bookings: ", hall.seats[seatNum-1].bookings);


    function matchingBooking (booking) {
        console.log("checking booking: ", booking);
        bookingStart = new Date(booking.startDate);
        bookingEnd = new Date(booking.endDate);
        return (booking.username==user.name && (checkDate.getTime() >= bookingStart.getTime()) && (checkDate.getTime() <= bookingEnd.getTime()));
    }

    const bookingIndex = hall.seats[seatNum-1].bookings.findIndex(matchingBooking);
    let hallBooking = hall.seats[seatNum-1].bookings[bookingIndex];
    console.log("hallbooking: ", hallBooking);
    let userBookingIndex = user.bookings.findIndex( (booking) => (booking.hallName == hallName && booking.seatNum == seatNum && booking.startDate==hallBooking.startDate));
    let userBooking = user.bookings[userBookingIndex];

    console.log("hallbooking: ", hallBooking);
    console.log("userbooking: ", userBooking);

    if (checkDate.getTime() === bookingStart.getTime() && bookingStart.getTime() === bookingEnd.getTime())
    {
        let updatedHallBookings = hall.seats[seatNum-1].bookings.filter( (booking, index) => index!==bookingIndex);
        let updatedUserBookings = user.bookings.filter( (booking, index) => index!= userBookingIndex);
        console.log("updateduserbookings: ", updatedUserBookings);
        hall.seats[seatNum-1].bookings = updatedHallBookings;
        user.bookings = updatedUserBookings;
    }
    else if (checkDate.getTime() === bookingStart.getTime())
    {
        bookingStart.setDate(bookingStart.getDate() + 1);
        hallBooking.startDate =  bookingStart.toDateString();
        hall.seats[seatNum-1].bookings[bookingIndex] = hallBooking;
        user.bookings[userBookingIndex].startDate = bookingStart.toDateString();
        console.log("hall booking: ", hallBooking);
        console.log("user bookings: ", user.bookings);
    }
    else if (checkDate.getTime() === bookingEnd.getTime())
    {
        bookingEnd.setDate(bookingEnd.getDate() - 1);
        hallBooking.endDate =  bookingEnd.toDateString();
        hall.seats[seatNum-1].bookings[bookingIndex] = hallBooking;
        user.bookings[bookingIndex].endDate = bookingEnd.toDateString();
        console.log("hall booking: ", hallBooking);
        console.log("user bookings: ", user.bookings);
    }
    else
    {
        let bookingOne = {
            username: hallBooking.username,
            startDate: hallBooking.startDate
        }; 
        let bookingTwo = {
            username: hallBooking.username,
            endDate: hallBooking.endDate
        };
        bookingEnd.setDate(checkDate.getDate() - 1);
        bookingOne.endDate = bookingEnd.toDateString();
        bookingStart.setDate(checkDate.getDate()+1);
        bookingTwo.startDate = bookingStart.toDateString();
        hall.seats[seatNum-1].bookings[bookingIndex] = bookingOne;
        hall.seats[seatNum-1].bookings.push(bookingTwo);

        bookingOne = {
            hallName,
            seatNum,
            startDate: hallBooking.startDate,
            endDate: bookingEnd.toDateString()
        };

        bookingTwo = {
            hallName,
            seatNum,
            startDate: bookingStart.toDateString(),
            endDate: hallBooking.endDate
        };

        user.bookings[userBookingIndex] = bookingOne;
        user.bookings.push(bookingTwo);
        console.log("userboookings: ", user.bookings);
    }
    await hall.save();
    await user.save();
    res.status(200).send("Booking Cancelled");
})

module.exports = router;