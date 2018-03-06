const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendfile('index.html');
});

//Whenever someone connects this gets executed
io.on('connection', (socket) => {
	console.log('A user connected');

	setTimeout(function () {
		socket.emit('superDuperEvent', { text: 'A custom event named superDuperEvent!' });
	}, 4000);
	
	socket.on('superDuperClientEvent', (data) => {
		console.log(data);
	});

	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
});

http.listen(3000, () => {
	console.log('listening on port *:3000');
});
