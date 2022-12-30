const net = require('net')
let sockets = [];

const sever = net.createServer(socket => {
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

sever.listen(4000)


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

