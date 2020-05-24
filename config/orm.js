// Import MySQL connection.
let con = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  console.table({ ob })
  let arr = [];
  // loop through the keys and push the key/value as a string int arr
  for (let key in ob) {
    let value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {devoured: true} => ["devoured=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

let errHandler = function (err) {
  throw err
}


// Object for all our SQL statement functions.
let orm = {
  all: function (tableInput) {
    let queryString = "SELECT * FROM " + tableInput + ";";
    return this.query(queryString).catch(errHandler)
  },
  create: function (table, cols, vals) {
    let queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";
    console.log(queryString);
    return this.query(queryString, vals).catch(errHandler)
  },
  // An example of objColVals would be {name: hampburger, devoured: true}
  update: function (table, objColVals, condition) {
    let queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    return this.query(queryString).catch(errHandler);
  },

  delete: function (table, condition) {
    let queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;
    return this.query(queryString).catch(errHandler)
  },

  query: function (statement, value) {
    return new Promise(function (resolve, reject) {
      con.query(statement, value, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res)
        }
      })
    })
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;
