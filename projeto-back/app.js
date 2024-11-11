const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = 5002;
const routes = require('./routes.js');
const logger = require("./logger.js");
const database = require('./mongo.js');

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}
app.use(express.json());
app.use(morgan('tiny'));
app.use(routes);
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // permite todas as rotas para OPTIONS
app.use(express.urlencoded({ extended: true })); // para dados de formulário


database()

app.listen(PORT, (err) => {
    if (err) {
        logger.error(`Error on listening: ${err}`);
    } else {
        logger.info(`Listening on port: ${PORT}`);
    }
});
