const jwt = require('jsonwebtoken');

const checkToken = (req,res,next) => {
    const token = req.cookies.jwt;
    if (token)
    {
        const username = jwt.verify(token, 'seating-auth-secret-key', (error, decodedToken) => {
            if (err)
            {
                res.status(400).send('unauthorized request.');
            }
            else {
                req.body.username = decodedToken.username;
                next();
            }
        })   
    }
    else
    {
        res.status(400).send('unauthorized request.');
    }
}

module.exports = checkToken;