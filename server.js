const dgram = require('dgram')
let sockets = [];

const sever = dgram.createSocket('udp4', socket => {
	sockets.push(socket);
	console.log('alguém chegou!');

	socket.on('data', data => {
		broadcast(data, socket)
	})

	socket.on('error', err => {
		console.log('Um cliente desconectou-se!')
	})

	socket.on('close', err => {
		console.log('Um cliente saiu do chat!')
	})
})

sever.bind(8080)


function broadcast(message, socketSent) {
	if (message === 'quit') {
		const index = sockets.indexOf(socketSent)
		sockets.splice(index, 1)
	} else {
		sockets.forEach(socket => {
			if (socket !== socketSent) socket.write(message)
		})
	}
}

