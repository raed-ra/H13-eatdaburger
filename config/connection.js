// Set up MySQL connection.
var mysql = require("mysql");
const ConnectionString = require('connection-string');

let dbConnection
if (process.env.CLEARDB_DATABASE_URL) {
   dbConnection = new ConnectionString(process.env.CLEARDB_DATABASE_URL);
} else {
    dbConnection = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "inkehnashod",
    database: "burger_db"
  }
}

var connection = mysql.createConnection(dbConnection);

// Make connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
