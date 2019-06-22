const express = require('express');
const app = express();
const port = 3000;
const routes = [
    'get-hello-world',
];

routes.forEach((suffix) => require(`./routes/${suffix}`)(app));

app.listen(port, () => console.log(`on port ${port}!`));

module.exports = app;
