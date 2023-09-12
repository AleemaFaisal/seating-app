const express = require('express');
const app = express();

const PORT = 5000;
app.listen(PORT, () => console.log("server running on port " + PORT));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aleemaf28:6ZaAp2KvgA6YSKH@basiccluster.1l0jkqo.mongodb.net/arbisoft-seating?retryWrites=true&w=majority')
.then(() => console.log("database connected"))
.catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const loginRoute = require('./routes/login');
const HallRoute = require('./routes/halls');
const teamRoute = require('./routes/team');
app.use('/login', loginRoute);
app.use('/halls', HallRoute);
app.use('/team', teamRoute);




