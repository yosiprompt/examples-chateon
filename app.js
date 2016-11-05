var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var User = require('./app/model/users.js');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/public/view'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

require('./app/routes.js')(app, io);


http.listen(3000, function() {
	console.log('escuchando en puerto 3000');
});