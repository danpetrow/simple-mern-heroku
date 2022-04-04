const mysql = require("mysql");
require('dotenv').config()

var connection = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.db
});

module.exports = connection;