const { Pool } = require('pg');
require('dotenv').config({ path: './.env' });
console.log("LOOK AT MEEEE",process.env)


const pool = new Pool({
  connectionString: process.env.pgURL
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
