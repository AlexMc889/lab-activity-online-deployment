const express = require('express');
const { Pool } = require('pg');
const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, 'credentials.env') });

// Create express app
const app = express();
const port = 3000;

// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    connectionTimeoutMillis: 5000,
    ssl: {rejectUnauthorized: false}
});

// Add process hook to shutdown pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});
	 	 	 	
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    const data = {name: 'Mario'};
    res.render('index', data);
});

app.get('/user', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees;');
        res.render('user', { teammembers: result.rows });
    } catch (error) {
        console.error('Failed to load team members:', error.message);
        res.status(500).send('Unable to load team members. Check the server terminal for the database error.');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
