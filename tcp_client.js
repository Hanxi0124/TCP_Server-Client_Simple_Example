const readlineSync = require('readline-sync');
const net = require('net');
const chalk = require('chalk')

let HOST = "127.0.0.1";
let PORT = "9000";
let client = null;

function openConnection(){
	if (client) {
		console.log(chalk.inverse(`******Connection is Already Open******`));
		menu();

		return;
	}
	else{
		client = new net.Socket();

		client.on('error',function(err){
			client.destroy();
			client = null;
			console.log(chalk.inverse(`Erro - Connection could not be Est`));
			menu();
		});

		client.on(`data`,function(data){
			console.log(chalk.inverse(`Received: ${data}`));
			menu('2');
		});

		client.connect(PORT, HOST, function(data){
			console.log(chalk.inverse(`Connection Opened Successfully`));
			menu();
		});
	}
}

function sendData(data){
	if (client) {
		client.write(data)
	}else{
		console.log(chalk.inverse(`--Connection is not Open or Closed--`));
		menu();
		return
	}
}

function closeConnection(){
	if (client) {
		client.destroy()
		client = null;
		console.log(chalk.inverse(`--Connection Closed Successfully--`));		
	}else{
		console.log(chalk.inverse(`--Connection is not Open or Closed--`));
		menu();
		return
	}
}

function menu(value){
	let readResult = value || readlineSync.question(chalk.inverse(`\n\nEnter`));
	
	switch(readResult){
		case "1":
		openConnection();
		break;
		case "2":
		let data = readlineSync.question(chalkl.inverse(`Enter the data`));
		(data === '--menu')? menu() : sendData(data);
		break;
		case "3":
		closeConnection();
		break;
		case "4":
		closeConnection();
		return;
		break;		
		default:
		console.log(chalk.inverse('--Command Not Recognized Please Try Again'));
		menu();
		break;
	}
	
}

