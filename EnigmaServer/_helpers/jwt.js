const config = require('../config.json');
const userService = require('../src/services/enigma.service');
const jwt = require('jsonwebtoken');

module.exports = {
    isRevoked,
    isAuthorized,
};


async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};

async function isAuthorized(req, res, next) {
    let token = req.headers['x-access-token'];
    console.log("token : ", token)
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}