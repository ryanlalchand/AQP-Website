var mysql = require("mysql");
const { credentials } = require("./credentials/credentials.js");

var connection = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: "10MB",
  multipleStatements: true, //needed to run multiple queries
  local_infile: true, //to mitigate error when loading data from local file
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);

  //connection.end();
});

const fs = require("fs");

var app = require("express");
app.use(express.static("public"));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "./public/index.html");
});

app.get("/DBrequest", function (request, response) {
  let query = request.query;

  switch (query) {
    case "query1":
      queryFile = fs.readFileSync("./queries/query1.sql").toString();
      break;
    case "query2":
      queryFile = fs.readFileSync("./queries/query2.sql").toString();
      break;
    case "query3":
      queryFile = fs.readFileSync("./queries/query3.sql").toString();
      break;
    default:
      //user didn't select a query, resend page
      response.sendFile(__dirname + "./public/index.html");
      break;
  }

  connection.query(queryFile, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);

    response.send(JSON.stringify(result));
  });
});

const https = require("https");

https
  .createServer(
    {
      key: fs.readFileSync("./credentials/key.pem"),
      cert: fs.readFileSync("./credentials/cert.pem"),
    },
    app
  )
  .listen(3000, function () {
    console.log("Go to https://localhost:3000/");
  });
