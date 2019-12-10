const express = require('express');
const app = express();
const port = 8008;
const server = app.listen(port);
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());

const http = require('http').Server(app);
const io = require('socket.io').listen(server);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());



// api routes
app.use('/enigma', require('./src/controllers/enigma.controller'));

io.set('origins', '*:*');
io.origins('*:*');
io.on('connection', function (socket) {
    console.log('a user connected');
});

// start server
// const server = app.listen(port, function () {
//     console.log('Server listening on port ' + port);
// });