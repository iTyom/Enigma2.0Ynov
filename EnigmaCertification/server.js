const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = 8004;


app.use(express.json())
const authRouter = require('./src/routes/auth')

app.use('/auth', authRouter)

app.listen(port, () => {
    console.log('--------------------SERVER INITIALIZED--------------------');
    console.log('-----------------------PORT : ' + port + '------------------------');
});