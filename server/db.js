const { Pool } = require('pg'); // Assuming PostgreSQL, change if using another database

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Function to query the database
const query = (text, params) => {
    return pool.query(text, params);
};

// Function to close the database connection
const close = () => {
    return pool.end();
};

// Exporting the query and close functions
module.exports = {
    query,
    close,
};