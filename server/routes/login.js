const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/UserSchema');

const CLIENT_ID= '61992319078-23ghu3p9na3vjc5qi4fg3mcr2mpgbncp.apps.googleusercontent.com';
const KEY = "fTC4tyqupCcbCH0";
const AGE =  2*24*60*60;


router.post('/', async (req,res) => {

    console.log("reached server");

    //silent auto log-in request
    const {appToken} = req.body;
    if (appToken)
    {
        const verified = jwt.verify(appToken, KEY);
        if (!verified)
        {
            res.status(400).send("token not verified.");
        }
        await User.findOne({appToken}).exec()
        .then(existingUser => res.status(200).send(existingUser))
        .catch(err => {console.log(err); res.status(500).send("server error")});
    }

    //create new user if needed and log in request
    const {googleToken} = req.body;
    if (googleToken)
    {
        //create apptoken from the google jwt token
        const payload = googleToken.credential;
        const appToken = jwt.sign({payload}, KEY, {expiresIn: AGE}); 

        //decode data from the google token
        const decodedToken = jwt_decode(googleToken);
        console.log("decodedToken: ", decodedToken);

        //check if user already exists - update tokens and return
        const returningUser = await User.findOne({email: decodedToken.email}).exec();
        if (returningUser)
        {
            returningUser.googleToken = googleToken;
            returningUser.appToken = appToken;
            await returningUser.save()
            .then( updatedUser => res.status(200).send(updatedUser));
        }
        
        //if new, save the user to db with tokens
        const newUser = new User({
            name: decodedToken.name,
            email: decodedToken.email,
            appToken: appToken,
            googleToken: googleToken,
            bookings: []
        });

        await newUser.save()
        .then( savedUser => res.status(200).send(savedUser));
    }
    if (!googleToken && !appToken)
    {
        res.status(400).send("invalid request");
    }
})


module.exports = router;