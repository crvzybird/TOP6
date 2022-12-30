const dgram = require('dgram')

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
	const client = socket.connect({
        port: 41234,
        address: '127.0.0.1'
    });

	readLine.on('line', data => {
		if (data === 'quit'){
			client.write(`${username} saiu do chat!`)
			client.setTimeout(1000);
		}else{
			client.write(username + ': ' + data)
		}
	})

	client.on('connect', () => {
		client.write(username + ' se juntou ao chat!')
	})

	client.on('data', data => {
		console.log('\x1b[33m%s\x1b[0m', data)
	})

	client.on('timeout', () => {
		client.write('quit');
		client.end()
	})

	client.on('end', () => {
		process.exit()
	})

	client.on('error', () => {
		console.log('Parece que o servidor caiu...')
	})
})
