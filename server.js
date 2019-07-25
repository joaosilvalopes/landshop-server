/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const secure = require('./middlewares/secure');
require('dotenv').config({ path: `${__dirname}/.env` });

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

const secureRoutes = [
    ['delete', '/account'],
    ['delete', '/listing/:slug'],
    ['post', '/listing'],
    ['post', '/recover-password'],
    ['put', '/email'],
    ['put', '/password'],
    ['put', '/profile'],
    ['put', '/username'],
    ['put', '/profile-picture'],
    ['put', '/listing/:slug'],
];

secureRoutes.forEach(([method, path]) => app[method](path, secure));

const routes = [
    'delete-account',
    'delete-listing',
    'get-listing',
    'get-listings',
    'get-user',
    'get-google-auth',
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
    'put-profile-picture',
    'put-listing',
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
