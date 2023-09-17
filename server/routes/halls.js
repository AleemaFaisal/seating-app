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
        console.log("halldocs: ", hallDocs);
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

router.post('/:hallName/:seatNum', async (req,res) => {
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

    const startDate = new Date(startDateString);
    let endDate;
    switch(option)
    {
        case "day": endDate = new Date(startDateString); break;
        case "week": endDate = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate() + (5-startDate.getDay())); break;
        case "month": endDate = new Date(startDate.getFullYear(), startDate.getMonth()+1, 0); break;
    }
    const endDateString = endDate.toDateString();

    let booking = {
        username: user.name,
        startDate: startDateString,
        endDate: endDateString
    }

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

    res.status(200).send("booking saved");
})

module.exports = router;