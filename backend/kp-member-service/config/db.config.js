const mysql = require("mysql2");
require("dotenv").config();

const conn = mysql.createConnection({
  host: process.env.HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

conn.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Database connected as id ' + conn.threadId);
})

module.exports = conn;