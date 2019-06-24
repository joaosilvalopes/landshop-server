const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;
const routes = [
    'get-hello-world',
    'post-register'
];

app.use(bodyParser.json());

const client = new pg.Client();

client.connect();

routes.forEach((suffix) => require(`./routes/${suffix}`)(app, client));

!module.parent && app.listen(port, () => console.log(`Running on port ${port}`));

module.exports = app;