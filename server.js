/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const secure = require('./middlewares/secure');
require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 3000);

const secureRoutes = [
    ['put', '/password'],
    ['put', '/email'],
    ['post', '/listing'],
];

secureRoutes.forEach(([method, path]) => app[method](path, secure));

app.use(bodyParser.json());

const routes = [
    'get-listing',
    'get-listings',
    'get-user',
    'post-listing',
    'post-login',
    'post-recover-password-email',
    'post-register',
    'post-verify-email',
    'put-password',
    'put-email',
];

const client = new pg.Client();

client.connect();

routes.forEach((suffix) => require(`./routes/${suffix}`)(app, client));

const server = app.listen(app.get('port'), 'localhost', () => {
    console.log(`The server is now running at http://localhost:${app.get('port')} in ${app.get('env')} mode.`);
    console.log('Press CTRL-C to stop.\n');
});

module.exports = {
    app,
    closeServer: () => server.close(),
};
