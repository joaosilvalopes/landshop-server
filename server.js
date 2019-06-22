const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const routes = [
    'get-hello-world'
];

app.use(bodyParser.json());

routes.forEach((suffix) => require(`./routes/${suffix}`)(app));

!module.parent && app.listen(port, () => console.log(`Running on port ${port}`));

module.exports = app;