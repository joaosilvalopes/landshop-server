/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const slowDown = require('express-slow-down');
const secure = require('./middlewares/secure');
require('dotenv').config({ path: `${__dirname}/.env` });

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.enable('trust proxy');
app.use(slowDown({
    windowMs: 1 * 60 * 1000, // 1 minute
    delayAfter: 50, // allow 50 requests per 1 minute, then...
    delayMs: 1000, // begin adding 1s of delay per request above 50
}));

const secureRoutes = [
    ['post', '/listing'],
    ['post', '/recover-password'],
    ['put', '/email'],
    ['put', '/password'],
    ['put', '/profile'],
    ['put', '/username'],
];

secureRoutes.forEach(([method, path]) => app[method](path, secure));

const routes = [
    'get-listing',
    'get-listings',
    'get-user',
    'post-listing',
    'post-login',
    'post-recover-password-email',
    'post-recover-password',
    'post-register',
    'post-verify-email',
    'put-email',
    'put-password',
    'put-profile',
    'put-username',
];

routes.forEach((route) => require(`./routes/${route}`)(app));

const server = app.listen(app.get('port'), 'localhost', () => {
    console.log(`The server is now running at http://localhost:${app.get('port')} in ${app.get('env')} mode.`);
    console.log('Press CTRL-C to stop.\n');
});

module.exports = {
    app,
    closeServer: () => server.close(),
};
