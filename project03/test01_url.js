var url = require('url');

var naverUrl = "https://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=102";
var parseNaverUrl = url.parse(naverUrl);

console.log("--- naverUrl ---");
console.log(parseNaverUrl);

var querystring = require('querystring');
var parameter = querystring.parse(parseNaverUrl.query);

console.log("--- parameter ---");
console.log(parameter);

console.log("--- parameter to string ---");
console.log(querystring.stringify(parameter));