const dotenv = require('dotenv');

const app = require('./app');

process.on('uncaughtException', (err) => {
	console.log(err.name, err.message);
	console.log('Uncaught Exception! Shutting Down...! 🔥🔥⚠🧨💣');
	process.exit(1);
});

dotenv.config({ path: './config.env' });

app.listen(5000, console.log('Server Running on Port 5000'));

process.on('unhandledRejection', (err) => {
	console.log(err.name, err.message);
	console.log('Unhandled Rjection! Shutting Down...! 🔥🔥⚠🧨💣');
	server.close(() => {
		process.exit(1);
	});
});
