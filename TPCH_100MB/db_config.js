var mysql = require("mysql");
const fs = require("fs");
const { credentials } = require("../credentials/credentials.js");

// Read the SQL file
const importSQL = fs.readFileSync("./mysql_config.sql").toString();

var connection = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: "100MB",
  multipleStatements: true, //needed to run multiple queries
  local_infile: true, //to mitigate error when loading data from local file
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);

  // Runs entire SQL file in one query
  connection.query(importSQL, function (err) {
    if (err) throw err;
    console.log("Database populated");
  });

  connection.end();
});
