const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 8008;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// api routes
app.use('/enigma', require('./src/controllers/enigma.controller'));


io.on('connection', function (socket) {
    console.log('a user connected');
});

// start server
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});


