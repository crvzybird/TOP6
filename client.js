const net = require('net')

const readLine = require('readline').createInterface({
	input: process.stdin,
	input: process.stdout
})

const waitForUserName = new Promise(resolve => {
	readLine.question('Enter a username to join the chat: ', answer => {
        resolve(answer);
    });
})

waitForUserName.then((username) => {
	const socket = net.connect({
        port: 4000
    });

	readLine.on('line', data => {
		if (data === 'quit'){
			socket.write(`${username} saiu do chat!`)
			socket.setTimeout(1000);
		}else{
			socket.write(username + ': ' + data)
		}
	})

	socket.on('connect', () => {
		socket.write(username + ' se juntou ao chat!')
	})

	socket.on('data', data => {
		console.log('\x1b[33m%s\x1b[0m', data)
	})

	socket.on('timeout', () => {
		socket.write('quit');
		socket.end()
	})

	socket.on('end', () => {
		process.exit()
	})

	socket.on('error', () => {
		console.log('Parece que o servidor caiu...')
	})
})
