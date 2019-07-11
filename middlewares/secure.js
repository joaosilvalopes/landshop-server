const jwt = require('jsonwebtoken');
const get = require('lodash/get');
const logger = require('../utils/logger');

const secure = (req, res, next) => {
    const authorization = get(req, 'headers.authorization') || '';

    const [, token] = authorization.split(' ');

    if (!token) {
        return res.status(401).send();
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);

        return next();
    } catch (e) {
        logger.log(e);
        return res.status(401).send();
    }
};

module.exports = secure;
