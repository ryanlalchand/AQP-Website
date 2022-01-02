var mysql = require("mysql");
const { credentials } = require("../credentials/credentials.js");

const tables = [
  "customer",
  "line_item",
  "nation",
  "order",
  "part",
  "partsupp",
  "region",
  "supplier",
];
const files = [
  "customer.tbl",
  "lineitem.tbl",
  "nation.tbl",
  "orders.tbl",
  "part.tbl",
  "partsupp.tbl",
  "region.tbl",
  "supplier.tbl",
];

var connection = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: "10MB",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);

  /*connection.query('CREATE DATABASE IF NOT EXISTS ' + '10MB', function (err) {
    if (err) throw err;
    console.log('Database created');
  });
  */

  //   for (var i = 0; i < tables.length; i++) {
  //     connection.query('CREATE TABLE IF NOT EXISTS ' + tables[i] + ' (id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id))', function (err) {
  //       if (err) throw err;
  //       console.log('Table created');
  //     });

  //     connection.query("LOAD DATA LOCAL INFILE " + files[i] + " INTO TABLE " + tables[i] + " FIELDS TERMINATED BY '|'", function (err) {
  //         if (err) throw err;
  //         console.log('Data entered');
  //       }
  //     );
  //   }
  //   connection.end();
});
