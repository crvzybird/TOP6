//3030 localhost 3031 localhost
//3031 localhost 3030 localhost

const my_port = process.argv[2]
const my_address = process.argv[3]
const destiny_port = process.argv[4]
const destiny_address = process.argv[5]

const dgram = require('dgram')
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
	console.log(`Erro no servidor:\n${err.stack}`);
	server.close()
})

server.on('message', (msg, rinfo) => {
	console.log(`message: ${msg} de ${rinfo.address}:${rinfo.port}`);
})

server.on('listening', () => {
	const address = server.address();
	console.log(`server listening ${address.address}:${address.port}`);
})


server.bind({
	address: my_address,
	port: my_port
})

const sendMessage = (msg) => {
	const message = Buffer.from(msg)
	console.log(`you sent: ${message}`)
	server.send(message, destiny_port, destiny_address, (err) => {

	})
}

process.openStdin().addListener("data", function (d) {
	if (d.toString().trim() == 'exit') {
		return process.exit()
	}
	sendMessage(d.toString().trim())
});



