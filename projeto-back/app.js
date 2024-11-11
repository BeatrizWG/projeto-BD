const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const routes = require('./routes.js');
const logger = require("./logger.js");
const database = require('./mongo.js');

//Cors Configuration
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Expose-Headers', 'Custom-Header');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.use(routes);
database();

app.listen(process.env.PORT, (err) => {
    if (err) {
        logger.error(`Error on listening: ${err}`);
    } else {
        logger.info(`Listening on port: ${process.env.PORT}`);
    }
});
