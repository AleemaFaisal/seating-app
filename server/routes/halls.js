const express = require('express');
const router = express.Router();

const Hall = require('../models/HallSchema');

router.get('/', async (req, res) => {
    const hallsData = await Hall.find({}, "name -_id").exec()
    .catch((err) => res.status(500).send(err));

    if (!hallsData)
    {
        res.status(400).send('no data found');
    }

    const hallNames = [];
    for (item in hallsData)
    {
        hallNames.push(hallsData[item].name);
    }
    res.status(200).send({"halls": hallNames});
});

router.get('/:hallName', async (req,res) => {
    const name = req.params.hallName;
    const doc = await Hall.findOne({name}).exec()
    .catch((err) => res.status(500).send(err));

    if (!doc)
    {
        res.status(400).send('no hall found with required name');
    }
    else
    {
        doc.seats.forEach((seat, seatNum) => {doc.seats[seatNum].available = doc.checkSeatAvailable(seatNum)});
        doc.numSeatsAvailable = doc.getNumSeatsAvailable();
        
        await doc.save()
        .then(res.status(200).send(doc))
        .catch(err => console.log(err));        
    }
})

router.post('/:hallName/:seatNum', async (req,res) => {
    const {username, days, months} = req.body;
    const {hallName, seatNum} = req.params;

    const hall = await Hall.findOne({name: hallName}).exec()
    .catch((err) => res.status(500).send(err));

    const seat = hall.seats[seatNum-1];
    let bookingClash;
    seat.bookings.forEach( booking => {
        const dayMatch = booking.days.includes(100) || days.some( day => booking.days.includes(day));
        const monthMatch = booking.months.includes(100) || months.some( month => booking.months.includes(month));  
        if (dayMatch && monthMatch) {bookingClash=true;}
    })

    if (bookingClash)
    {
        res.status(400).send('Error - Clash with another booking. Choose different slots.');
    }
    else
    {
        const newBooking = {
            username: username,
            days: days,
            months: months
        };

        hall.seats[seatNum -1].bookings.push(newBooking);
        hall.seats[seatNum-1].available = hall.checkSeatAvailable(seatNum);

        await hall.save()
        .then(res.status(200).send("booking saved."))
        .catch((err) => res.status(500).send(err));        
    }
})


//testing schema methods
router.get('/numseats/:hallname', async (req,res) => {
    const {hallname} = req.params;
    const hall = await Hall.findOne({name: hallname}).exec();
    console.log(hall.getNumSeatsAvailable());
    const num = hall.getNumSeatsAvailable();
    res.status(200).send({"num": num});
})

module.exports = router;