var express = require('express');    
var app = express();                  

/* EJS */
app.set('view engine','ejs');
app.set('views','./views');

/* Mysql */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql1234',
    database: 'blog'
});
conn.connect();

/* Listening port */
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

/* URL: Root */
app.get('/', function (req, res) {
    res.render('index', {});
});

/* URL: Sign up */
app.get('/signup', function (req, res) {
    res.render('signup', {});
});

/* URL: Login */
app.get('/login', function (req, res) {
    res.render('login', {});
});