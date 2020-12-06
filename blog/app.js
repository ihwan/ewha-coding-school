/* 환경 설정 */
require('dotenv').config()

/* Express 사용 설정 */
var express = require('express');
var app = express();

/* Public */
app.use(express.static('public'));

/* Moment */
var moment = require('moment');
app.locals.moment = require('moment');

/* EJS 템플릿 사용설정 */
app.set('view engine', 'ejs');
app.set('views', './template');

/* URL 파서 설정 */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

/* Upload */
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
var upload = multer({ storage: _storage })
app.use('/uploads', express.static('uploads'));

/* Mysql */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
conn.connect();

/* Session */
const session = require('express-session');
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});

/* 포트 리스닝 */
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(port + " port listening...");
});

/* 첫페이지 만들기 */
app.get('/', function(req, res) {
    var sql = "SELECT `id`, `title`, `desc`, `author`, `inserted`, `upload` FROM posts ORDER BY `id` DESC";

    conn.query(sql, [], function(err, result, fields){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error: ' + err);
        } else {
            res.render('index', {
                data: result,
            });
        }
    });
});

/* main 페이지 만들기 */
app.get('/main', function(req, res) {
    res.render('main', {});
});

/* 블로그 글쓰기 */
app.get('/add', function(req, res){

    console.log(req.session);

    if (!req.session.user) {
        console.log("Login required");
        res.status(403).send("Login required");
    } else {
        res.render('add', {});
    }
});

/* 블로그 글쓰기 버튼 누른후 */
app.post('/add', upload.single('upload'), function(req, res){
    console.log(req.body);
    var title = req.body.title;
    var desc = req.body.desc;
    var author = req.body.author;
    var upload = req.file.filename;

    var sql = 'INSERT INTO posts (`title`, `desc`, `author`, `upload`, `inserted`) VALUES (?, ?, ?, ?, now())';
    conn.query(sql, [title, desc, author, upload], function(err, result, fields){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error: ' + err);

      } else {
        res.redirect('/' + result.insertId);
      }
    });

});


/* 상세페이지 */
app.get('/:id', (req, res) => {
    var id = req.params.id;
    console.log("id -->" + id);
    var sql = "SELECT `id`, `title`, `desc`, `author`, `upload`, `inserted` FROM posts WHERE id = ?";

    conn.query(sql, [id], function(err, result, fields){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error: ' + err);
        } else {

            /* READ comment */
            var commentSql = "SELECT * FROM blog.comment WHERE post_id = ? ";
            conn.query(commentSql, [id], function(err, commentResult, fields){

                console.log(commentResult);
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error: ' + err);
                } else {
                    res.render('detail', {
                        data: result[0],
                        commentData: commentResult
                    });
                }
            });
        }
    });
});

/* 상세페이지 - POST write comment */
app.post('/:id', function(req, res){
    var postId = req.params.id;
    var comment = req.body.comment;

    var sql = 'INSERT INTO blog.comment(`post_id`, `comment`, `inserted`) VALUES (?, ?, now())';
    conn.query(sql, [postId, comment], function(err, result, fields){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error: ' + err);

      } else {
        res.redirect('/' + postId);
      }
    });

});

/* 삭제확인 페이지 */
app.get('/:id/delete', (req, res) => {
    var id = req.params.id;
    console.log("id -->" + id);
    var sql = "SELECT `id`, `title`, `inserted` FROM posts WHERE id = ?";

    conn.query(sql, [id], function(err, result, fields){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error: ' + err);
        } else {
            res.render('delete', {
                data: result[0],
            });
        }
    });
});

/* 삭제 DB row DELETE */
app.post('/:id/delete', (req, res) => {
    var id = req.params.id;
    console.log("Delete ID --> " + id);

    var sql = 'DELETE FROM posts WHERE id = ?';
    conn.query(sql, [id], function(err, result, fields){
        if(err){
        console.log(err);
        res.status(500).send('Internal Server Error: ' + err);
        } else {
        res.redirect('/');
        }
    });
});

/* 수정 페이지 */
app.get('/:id/edit', (req, res) => {
    var id = req.params.id;
    console.log("id -->" + id);
    var sql = "SELECT `id`, `title`, `desc`, `author`, `upload`, `inserted` FROM posts WHERE id = ?";

    conn.query(sql, [id], function(err, result, fields){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error: ' + err);
        } else {
            res.render('edit', {
                data: result[0],
            });
        }
    });
});

/* 수정 DB row UPDATE */
app.post('/:id/edit', upload.single('upload'), (req, res) => {
    var id = req.params.id;
    var title = req.body.title;
    var desc = req.body.desc;
    var author = req.body.author;
    
    if (typeof req.file !== 'undefined') {
        var upload = req.file.filename;
        var sql = 'UPDATE posts SET title = ?, `desc`= ?, `author` = ?, `upload` = ?, `updated` = now() WHERE id = ?;';
        var sqlParam = [title, desc, author, upload, id];
    } else {
        var sql = 'UPDATE posts SET title = ?, `desc`= ?, `author` = ?, `updated` = now() WHERE id = ?;';
        var sqlParam = [title, desc, author, id];
    }

    conn.query(sql, sqlParam, function(err, result, fields){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error: ' + err);
      } else {
        res.redirect('/' + id);
      }
    });
});

/* account app */
var account = require('./routes/account.js')(app, conn, upload);
app.use('/account', account);