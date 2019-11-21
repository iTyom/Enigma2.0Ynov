/* const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = 8008;


app.use(bodyParser.json())
const authRouter = require('./users/user.controller')

app.use('/login', authRouter)

app.listen(port, () => {
    console.log('--------------------SERVER INITIALIZED--------------------');
    console.log('-----------------------PORT : ' + port + '------------------------');
}); */

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api

// api routes
app.use('/users', require('./src/controllers/user.controller'));

// global error handler

// start server
const port = 8008;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});


