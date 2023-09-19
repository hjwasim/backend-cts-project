const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createPool({
  connectionLimit: 100,
  host: process.env.HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
});

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Database connected successfully!: ");
});
