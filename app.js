const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db');
const mysql = require('mysql');
const cors = require('cors');
const expressSession = require('express-session');

const connection = mysql.createConnection(dbConfig);
connection.connect();

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(require('cookie-parser')('secret'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
}));
app.use('/', cors());

require('./routes')(app, connection);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500);
    res.json({error: 'error'});
});

app.listen(app.get('port'), () => {
    console.log(`Express started on ${app.get('port')}`);
});
