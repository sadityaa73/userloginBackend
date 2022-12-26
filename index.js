const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const signup = require('./api/signup');

app.use('/api/signup', signup);

const login = require('./api/login');

app.use('/api/login', login);

app.listen(port, (err) => {
    if (!err) {
        console.log(`express connecteed successfull at port ${port}!!`);
    } else {
        console.log(`express connection err occured at port ${port}!!`);
    }
})