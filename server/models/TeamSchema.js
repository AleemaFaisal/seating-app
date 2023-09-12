const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: {type: String, unique: true},
    hall: String,
    members: [String]
});

const Team = mongoose.model('team', TeamSchema);
module.exports = Team;