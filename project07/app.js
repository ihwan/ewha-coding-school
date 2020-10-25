var express = require('express');    
var app = express();

/* md 5 */
var md5 = require('md5');

/* URL */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

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

/* Sign Up: POST */
app.post('/signup', function (req, res) {
    console.log(req.body);
    var email = req.body.email;
    var userid = req.body.userid;
    var password = req.body.password;
    var address = req.body.address;

    /* Check duplicate */
    var sql = 'SELECT COUNT(*) as cnt FROM users WHERE email = ?'
    conn.query(sql, [email], function(err, result, fields){
        if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error: ' + err);

        } else if (result[0].cnt > 0) {
        console.log(err);
        res.status(500).send('Duplicated email: ' + email);

        } else {
        /* password hash */
        var hashed_password = md5(password);

        var sql = "INSERT INTO users (`userid`, `email`, `password`, `address`, `inserted`) VALUES (?, ?, ?, ?, now())";
        conn.query(sql, [userid, email, hashed_password, address], function(err, result, fields){

            if(err){
            console.log(err);
            res.status(500).send('Internal Server Error: ' + err);

            } else {
            var sql = 'SELECT * from users WHERE id = ?';
            conn.query(sql, [result.insertId], function(err, users, fields){
                if(err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
                }

                res.render('signup_done', {
                user: users[0]
                });
            });
            }
        });
        }
    });
});

/* URL: Login */
app.get('/login', function (req, res) {
    res.render('login', {});
});