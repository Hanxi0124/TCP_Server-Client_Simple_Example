const net = require("net")
const chalk = require('chalk')
const server = net.createServer();

server.on('connection',function(socket){
	let remoteAddress = socket.remoteAddress + ':' + socket.remotePort:
	console.log(chalk.inverse(`new client connection is made ${remoteAddress}`));

	socket.on('data',function(receicedData){
		console.log(chalk.inverse((`connection data from ${remoteAddress},`)));
		socket.write(`Server Msg: '${receicedData}' received`)
	})

	socket.once('close',function()
		console.log(chalk.inverse(`connection with '${remoteAddress}' was closed`));

	})

	socket.on('error',function(err){
		console.log(chalk.red(`socket error: ${err.message}`));

	})

})

socket.on('error',function(err){
		console.log(chalk.inverse(err));

	})

socket.listen(9000,function(){
		console.log(chalk.inverse(`server listening to: ${JSON.stringify(server)}`));

	})


