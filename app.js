const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db');
const mysql = require('mysql');
const connection = mysql.createConnection(dbConfig);
connection.connect();

const app = express();
app.set('port', process.env.PORT || 3000);


app.use(bodyParser.urlencoded({ extended: true }));
require('./routes')(app, connection);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500);
    res.json({error: 'error'});
});

app.listen(app.get('port'), () => {
    console.log(`Express started on ${app.get('port')}`);
});
