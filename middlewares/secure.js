const get = require('lodash/get');
const logger = require('../utils/logger');
const { verifyToken } = require('../utils/authToken');

const secure = (req, res, next) => {
    const authorization = get(req, 'headers.authorization') || '';

    const [, token] = authorization.split(' ');

    if (!token) {
        return res.status(401).send();
    }

    try {
        req.user = verifyToken(token);

        return next();
    } catch (e) {
        logger.log(e);
        return res.status(401).send();
    }
};

module.exports = secure;
