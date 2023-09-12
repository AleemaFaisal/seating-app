const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//temporary auth route to be replaced with google api later

router.post('/', (req,res) => {
    const {email, password} = req.body;
    const format = /@arbisoft\.com$/;
    const valid = format.test(email);
    if (valid)
    {
        const age = 2*60*60;
        const username = email.substr(email.length - 13);
        const token = jwt.sign({username}, 'seating-auth-secret-key', {expiresIn: age });
        res.cookie("jwt", token, {maxAge: age*1000, httpOnly: true});
        res.status(200).send('login success');
    }
    else
    {
        res.status(400).send('Invalid Email');
    }
})


module.exports = router;