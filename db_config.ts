const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createPool({
  host: process.env.NODE_MYSQL_HOST,
  user: process.env.NODE_MYSQL_USER,
  password: process.env.NODE_MYSQL_PWD,
  database: process.env.NODE_MYSQL_DB,
});

module.exports = connection;
