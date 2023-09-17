const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aleemaf28:6ZaAp2KvgA6YSKH@basiccluster.1l0jkqo.mongodb.net/arbisoft-seating?retryWrites=true&w=majority')
.then(() => console.log("database connected"));

const Team = require('./models/TeamSchema');
const Hall = require('./models/HallSchema');

//INITIALIZE HALLS
function initHall(hname, hseats)
{
    const hallName = hname;
    const totalSeats = hseats;
    const numSeatsAvailable = hseats;
    const seats = [];
    for (let i=1; i<=hseats; i++)
    {
        const nextSeat = {
            seatNum: i,
            bookings: [],
        }
        seats.push(nextSeat);
    }
    const nextHall = new Hall({hallName, totalSeats, numSeatsAvailable, seats});
    nextHall.save()
    .then(console.log("Hall Saved"))
    .catch((err) => console.log(err));
}

initHall("Kayak", 55);

//INITIALIZE TEAMS
//for (let n=1; n<=6; n++) 
{
    // async function createTeams() {
    
    // let teamHall = "McKinsey";
    // let teamName = teamHall + "T" + n;
    // let myTeam = {
    //     name: teamName,
    //     hall: teamHall,
    //     members: []
    // };
    // for (let i=1; i<=7; i++)
    // {

    //     myTeam.members.push("Mk" + n + "M" + i);
    // }

    // const newTeam = new Team(myTeam);
    // await newTeam.save()
    // .then(console.log("team "+ teamName +" saved"))
    // .catch((err) => console.log("team "+ teamName +" not saved - " + err.message));
    // }

    // createTeams();
}


// async function insertDoc(num, hall)
{
//     const newSeat = new Seat({
//         seatNum: num,
//         hallName: hall,
//         bookings: []
//     });
//         await newSeat.save()
//         .then(console.log("saved " + num + " of " + hall))
//         .catch((err) => {console.log("could not save " + num + "of" + hall + " - " + err.message)});
//}

// let nextHall = "Kayak";
// for (let i=1; i <= 55; i++)
// {
//     insertDoc(i, nextHall);
// }

//  nextHall = "edX";
// for (let i=1; i <= 25; i++)
// {
//     insertDoc(i, nextHall);
// }

// nextHall = "McKinsey";
// for (let i=1; i <= 35; i++)
// {
//     insertDoc(i, nextHall);
}

//function troubleshooting()
{
// async function insertDoc(num, hall)
// {
//     const newSeat = new Seat({
//         seatNum: num,
//         hallName: hall,
//         bookings: []
//     });
//         await newSeat.save()
//         .then(console.log("saved " + num + " of " + hall))
//         .catch((err) => {console.log("could not save " + num + "of" + hall + " - " + err.message)});
// }

// let nextHall = "edX";
// for (let i=1; i <= 25; i++)
// {
//     insertDoc(i, nextHall);
// }

// async function update ()
// {
//     const checkBooking = {
//         username: "aleema",
//         days: [4,5],
//         months: [7,8,9]
//     };

//     const myseat = await Seat.find({hallName: "edX", seatNum: 3});
//     console.log(myseat.bookings);
   
//     await myseat.save()
//     .then(console.log('updated booking'))
//     .catch((err) => console.log('booking update failed - ' + err.message));
// }

// async function test()
// {
    // const newSeat = new Seat({
    //     seatNum: 5,
    //     hallName: "kayak",
    //     bookings: []
    // });

    // await newSeat.save()
    // .then(console.log("seat saved"))
    // .catch((err) => console.log("not saved - " + err));

//     const mybooking = {
//         username: "ayesha",
//         days: [1,3],
//         months: [4,5,9]
//     };

//     const myseat = await Seat.findOne({hallName: "kayak", seatNum: 5}).exec();
//     myseat.bookings.push(mybooking);
//     await myseat.save()
//     .then(console.log('booking added'))
//     .catch(console.log((err) => "not added - " + err));
//     console.log("available: "+ myseat.available());
};
//
