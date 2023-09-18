const express = require('express');
const router = express.Router();

const User = require('../models/UserSchema');

router.get('/:email', async (req,res) => {
    const email = req.params.email;
    const user = await User.findOne({email}).exec();

    if (!user)
    {
        res.status(400).send("user not found");
    }

    res.status(200).send(user);
})

router.get('/:email/week-bookings', async (req,res) => {
    const email = req.params.email;
    const startDateString = decodeURI(req.query.startDate);

    const user = await User.findOne({email}).exec();

    if (!user){
        res.status(400).send("user not found");
    }

    let bookingsFound = [];

    let checkDate = new Date(startDateString);
    for (let i=0; i<5;i++)
    {
        const found =  user.bookings.filter( booking => {
            const bookingStart = new Date(booking.startDate).getTime();
            const bookingEnd = new Date(booking.endDate).getTime();
            return checkDate.getTime() >= bookingStart && checkDate.getTime() <= bookingEnd;
        });
        console.log("found: ", found);
        if (found.length>0) {
            bookingsFound.push({"hall": found[0].hallName, "date": checkDate.toDateString()});
        }
        checkDate.setDate(checkDate.getDate() + 1);
    }
    console.log("foundboookings: ",bookingsFound);
    res.status(200).send(bookingsFound);       
})

module.exports = router;