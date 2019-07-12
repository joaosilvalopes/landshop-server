const jwt = require('jsonwebtoken');
const omit = require('lodash/omit');

const signToken = (user) => jwt.sign(user, process.env.JWT_SECRET);

const OMITED_FIELDS = [
    'password',
    'iat',
];

module.exports = {
    signToken,
    verifyToken: (token) => jwt.verify(token, process.env.JWT_SECRET),
    withToken: (user) => ({ ...omit(user, OMITED_FIELDS), token: signToken(user) }),
};
