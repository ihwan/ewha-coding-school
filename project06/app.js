var express = require('express');     // express 모듈 사용 
var app = express();                  // 모듈을 변수으로 지정

/* MySQL */
var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mysql1234',
  database : 'blog'
});
conn.connect();

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.get('/', (req, res) => {
    var sql = 'SELECT * FROM posts';
    
    conn.query(sql, function(err, rows, fields){
        if(err){
        res.send(err);
        } else {
        var output = "";
        for(var i=0; i<rows.length; i++){
            output += "title: " + rows[i].title 
            output += " / author: " + rows[i].author +"\n";
        }
        res.send(output);
        }
    });
});