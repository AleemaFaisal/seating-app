const Hall = require('../models/HallSchema');

async function populateDocByDate(docId, checkDateString)
{
    const doc = await Hall.findById(docId, "hallName totalSeats numSeatsAvailable");
    doc.seats.forEach((seat, seatNum) => {doc.seats[seatNum].occupant = doc.getOccupant(seatNum, checkDateString)});
    doc.numSeatsAvailable = doc.getNumSeatsAvailable(checkDateString);
    return doc;
}

module.exports = populateDocByDate;