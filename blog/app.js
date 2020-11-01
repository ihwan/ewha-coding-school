/* Express 사용 설정 */
var express = require('express');
var app = express();

/* EJS 템플릿 사용설정 */
app.set('view engine', 'ejs');
app.set('views', './template');

/* URL 파서 설정 */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

/* Mysql */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql1234',
    database: 'blog'
});
conn.connect();

/* 포트 리스닝 */
app.listen(3000, function() {
    console.log("3000 port listening...");
});

/* 첫페이지 만들기 */
app.get('/', function(req, res) {
    var sql = "SELECT `id`, `title`, `desc`, `author`, `inserted` FROM posts";

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

/* 로그인 페이지 만들기 */
app.get('/login', function(req, res){
    res.render('login', {});
});

/* 회원가입 페이지 만들기 */
app.get('/signup', function(req, res){
    res.render('signup', {});
});

/* 블로그 글쓰기 */
app.get('/add', function(req, res){
    res.render('add', {});
});

/* 블로그 글쓰기 버튼 누른후 */
app.post('/add', function(req, res){
    console.log(req.body);
    var title = req.body.title;
    var desc = req.body.desc;
    var author = req.body.author;

    var sql = 'INSERT INTO posts (`title`, `desc`, `author`, `inserted`) VALUES (?, ?, ?, now())';
    conn.query(sql, [title, desc, author], function(err, result, fields){
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
    var sql = "SELECT `id`, `title`, `desc`, `author`, `inserted` FROM posts WHERE id = ?";

    conn.query(sql, [id], function(err, result, fields){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error: ' + err);
        } else {
            res.render('detail', {
                data: result[0],
            });
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
    var sql = "SELECT `id`, `title`, `desc`, `author`, `inserted` FROM posts WHERE id = ?";

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
app.post('/:id/edit', (req, res) => {
    var id = req.params.id;
    var title = req.body.title;
    var desc = req.body.desc;
    var author = req.body.author;

    var sql = 'UPDATE posts SET title = ?, `desc`= ?, `author` = ?, `updated` = now() WHERE id = ?;';
    var sqlParam = [title, desc, author, id]

    conn.query(sql, sqlParam, function(err, result, fields){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error: ' + err);
      } else {
        res.redirect('/' + id);
      }
    });
  });