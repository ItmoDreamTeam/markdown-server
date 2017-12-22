const port = 88;

const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

mongoClient.connect(db.url, (err, client) => {
    if (err) return console.log(err);

    require('./app/index')(app, client.db('md'));
    app.listen(port, () => {
        console.log('Started on port ' + port)
    });
});
