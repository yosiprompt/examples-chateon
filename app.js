var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var User = require('./app/model/users.js');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/public/view'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

require('./app/routes.js')(app, io);


http.listen(port, function() {
	console.log('escuchando en puerto ' + port);
});