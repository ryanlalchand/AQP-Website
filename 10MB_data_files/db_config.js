var mysql = require("mysql");
const fs = require("fs");
const { credentials } = require("../credentials/credentials.js");

// Read the SQL file
const importSQL = fs.readFileSync("./mysql_config.sql").toString();

var connection = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: "10MB",
  multipleStatements: true,
  local_infile: true,
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);

  // connection.query("CREATE DATABASE IF NOT EXISTS " + "10MB", function (err) {
  //   if (err) throw err;
  //   console.log("Database created");
  // });

  connection.query(importSQL, function (err) {
    if (err) throw err;
    console.log("Database populated");
  });

  connection.end();
});
