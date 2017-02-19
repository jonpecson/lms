var express = require('express');

var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

/* GET home page. */
app.get('/', function(req, res, next) {
    //Path to your main file
    res.status(200).sendFile(path.join(__dirname + '../public/index.html'));
});

app.listen(8080);