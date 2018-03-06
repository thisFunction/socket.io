const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendfile('index.html');
});


let clients = 0;

io.on('connection', (socket) => {
	clients++;
	io.sockets.emit('broadcast', clients);

	socket.emit('newclientconnect',{ description: `Welcome, there are ${clients} clients connected`});
   	socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})

	setTimeout(function () {
		socket.emit('superDuperEvent', { text: 'A custom event named superDuperEvent has fired!' });
	}, 4000);

	socket.on('superDuperClientEvent', (data) => {
		console.log(data);
	});

	socket.on('disconnect', () => {
		clients--;
		io.sockets.emit('broadcast', clients);
	});
});

http.listen(3000, () => {
	console.log('listening on port *:3000');
});
