const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {

    let auth_token = req.headers['authorization'];
    if (!auth_token) {
        return res.send({ error: "No access token provided." });
    }
    const access_token = auth_token.split('Bearer ')[1];
    jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
        if (err && err.name === 'TokenExpiredError')
            return res.status(400).json({ message: "Token expired, Retry your login." });
        if (err && err.name === 'JsonWebTokenError')
            return res.status(400).json({ message: "Token Tampared, Retry your login." });
        if (decoded) {
            res.locals.user_member_id = decoded.id
            next();
        }
    });
};

module.exports = verifyJwt;