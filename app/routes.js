var users = [];
module.exports = function(app, io) {
	app.get('/', function(req, res) {
		res.render('index', {navbar_url: '/avatars', pagina: 'Chat'});
	});

	app.get('/avatars', function(req, res) {
		if(req.cookies.avatar){
			res.redirect('/chat');
		}else {
			res.render('avatars');
		}
	});

	app.get('/chat', function(req, res) {
		if(req.cookies.avatar){
			res.render('chat', {usuarios: users, navbar_url: '/cerrar_sesion', pagina: 'Cerrar Sesión'});
		}else{
			res.redirect('/avatars');
		}
	});

	app.get('/cerrar_sesion', function(req, res) {
		res.render('cerrar_sesion.pug', {navbar_url: '/avatars', pagina: 'Chat'});
	})

	io.on('connection', function(socket) {
		socket.on('disconnect', function() {
			io.emit('usuario desconectado', socket.id);
			users.splice(users.findIndex(o => o.nombre == socket.id), 1);
		});
		socket.on('registrar usuario', function (avatar, fn) {
			users.push({
				nombre: socket.id,
				avatar: avatar
			});
			fn(users, socket.id);
			io.emit('usuario conectado', socket.id, avatar);
		});
		socket.on('mensaje', function(msg) {
			socket.broadcast.emit('mensaje', msg, socket.id);
		});
	});
}