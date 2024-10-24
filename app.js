const express = require('express');
const app = express();
const PORT = 5002;

const routes = require('./routes.js');
const logger = require("./logger.js");
const database = require('./mongo');

app.use(express.json());
app.use(routes);
database()

app.listen(PORT, (err) => {
    if (err) {
        logger.error(`Error on listening: ${err}`);
    } else {
        logger.info(`Listening on port: ${PORT}`);
    }
});
