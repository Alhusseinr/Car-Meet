const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const router = require('./routes');

function startServer(server) {
    const { PORT } = process.env;

    server.listen(PORT || 5000, () => {
        console.log(`server running on ${PORT}`);
    });
}

async function init(){
    const app = express();

    app.use(bodyparser.json());
    app.use(cors());
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept');
        next();
    });
    app.use(morgan('tiny'));
    router(app);
    startServer(app);
}

init();