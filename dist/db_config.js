"use strict";
var mysql = require("mysql2");
require("dotenv").config();
var connection = mysql.createPool({
    host: process.env.NODE_MYSQL_HOST,
    user: process.env.NODE_MYSQL_USER,
    password: process.env.NODE_MYSQL_PWD,
    database: process.env.NODE_MYSQL_DB
});
module.exports = connection;
//# sourceMappingURL=db_config.js.map

//hibou