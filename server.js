/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

const routes = [
    'get-hello-world',
    'get-listings',
    'post-register',
    'post-verify-email',
];

const client = new pg.Client();

client.connect();

routes.forEach((suffix) => require(`./routes/${suffix}`)(app, client));

!module.parent && app.listen(app.get('port'), 'localhost', () => {
    console.log(`The server is now running at http://localhost:${app.get('port')} in ${app.get('env')} mode.`);
    console.log('Press CTRL-C to stop.\n');
});

module.exports = app;
