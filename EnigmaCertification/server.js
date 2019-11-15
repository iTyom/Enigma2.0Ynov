const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = 8004;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(bodyParser.json())
const authRouter = require('./src/routes/auth')

app.use('/auth', authRouter)

app.listen(port, () => {
    console.log('--------------------SERVER INITIALIZED--------------------');
    console.log('-----------------------PORT : ' + port + '------------------------');
});