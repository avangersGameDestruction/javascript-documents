const CONST = require('../../config')
exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send('invalid request'); //invalid request
            } else {
                req.jwt = jwt.verify(authorization[1], CONST.SECRET);
                return next();
            }
        } catch (err) {
            return res.status(403).send(); //invalid token
        }
    } else {
        return res.status(401).send('invalid request');
    }
}