const { Pool } = require('pg');

const pool = new Pool({
	user: 'postgres',
	host: '127.0.0.1',
	database: 'restaurant ',
	port: 5433,
	password: 'root',
});

module.exports = pool;
