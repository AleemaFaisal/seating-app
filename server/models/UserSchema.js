const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:  String,
    email: {type: String, unique: true},
    appToken: {type: String, unique: true},
    googleToken: {type: String, unique: true}
});

const User = mongoose.model('user', UserSchema);
module.exports = User;