var express = require('express');     // express 모듈 사용 
var app = express();                  // 모듈을 변수으로 지정
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','./views');

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/about', function (req, res) {
    res.send('about');
});

app.get('/hello', function (req, res) {
    var messageArray = [
        '안녕하세요.', '안녕', 'Hello', 'Hi', 
        'Namaste', 'Hej', 'Guten Tag', 'Hallo',
        'Salve', 'Ahn nyong ha se yo', 'Nǐ hǎo', 'Olá'
    ];
    var rand = [Math.floor(Math.random() * messageArray.length)];

    res.render('hello', {message: messageArray[rand]});
});

app.get('/bts', function (req, res) {
   
    res.render('bts', {});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});