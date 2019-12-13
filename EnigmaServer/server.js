const express = require('express');
const app = express();
const port = 8008;
const cors = require('cors');
app.use(cors());


const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

const bodyParser = require('body-parser');
const io = require('socket.io').listen(server);

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", ['http://localhost:4200']);
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers",
        'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,Authorization');
    next();
});

// api routes
app.use('/enigma', require('./src/controllers/enigma.controller'));

// io.origins(['localhost:4200', 'localhost:8008', 'localhost:8004']);

io.on('connection', function (socket) {
    console.log('a user connected');
});

io.on('message', function (socket) {
    console.log('sss');
});



// start server
// const server = app.listen(port, function () {
//     console.log('Server listening on port ' + port);
// });