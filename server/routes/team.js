const express = require('express');
const router = express.Router();

const Team = require('../models/TeamSchema');

const auth = require('../middleware/auth');
router.use('/', auth);

router.get('/', async (req,res,next) => {
    const { username } = req.query;
    if (!username)
    {
        res.status(400).send('bad request - incomplete data.');
    }
    const queryTeam = await Team.findOne({members: username});
    if (queryTeam)
    {
        res.status(200).send(queryTeam);
    }
    else
    {
        res.status(400).send('no team found for this user.');
    }
});

module.exports = router;