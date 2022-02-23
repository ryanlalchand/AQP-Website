var mysql = require("mysql");
const { credentials } = require("./credentials/credentials.js");

var connection10MB = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: "10MB",
  multipleStatements: true, //needed to run multiple queries
  local_infile: true, //to mitigate error when loading data from local file
  supportBigNumbers: true, //speaks for itself
});

connection10MB.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection10MB.threadId);
});

var connection100MB = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: "100MB",
  multipleStatements: true, //needed to run multiple queries
  local_infile: true, //to mitigate error when loading data from local file
  supportBigNumbers: true, //speaks for itself
});

connection100MB.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection100MB.threadId);
});

const fs = require("fs");
var express = require("express");
var app = express();
app.use(express.static("public"));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/public/index.html");
});

app.post("/DBrequest", function (request, response) {
  let query = request.body.query;
  let queryFile = __dirname + "/queries/" + query + ".sql";
  let size = request.body.size;

  console.log({ query, queryFile, size });

  if (query == "") {
    response.send(__dirname + "/public/index.html");
  } else {
    let queryString = fs.readFileSync(queryFile).toString();
    if (size == "10MB") {
      connection10MB.query(queryString, function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("result: " + JSON.stringify(result));

        response.send(result);
      });
    } else if (size == "100MB") {
      connection100MB.query(queryString, function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("result: " + JSON.stringify(result));
        console.log(result[0]["count (*)"]);

        //var resultJSON = Object.assign({}, result[0]["count (*)"]);

        response.send(JSON.stringify(result[0]["count (*)"]));
      });
    }
  }
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
