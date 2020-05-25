// Set up MySQL connection.
var mysql = require("mysql");
const {ConnectionString} = require('connection-string');

let dbConnection

if (process.env.JAWSDB_URL) {
   connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({ 
    host: "localhost",
    port: 3306,
    user: "root",
    password: "inkehnashod",
    database: "burger_db"
  });
};
console.log(process.env.CLEARDB_DATABASE_URL);
console.log(dbConnection);
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
