# Capstone

Building a UI for [the YSU Data Lab](https://datalab.ysu.edu/) to run database comparison tests

Used `mkcert` to create https certificate and key for localhost

## Run the app

Clone the repo to your own machine

Open directory in your editor/terminal/IDE of choice

You will need to have installed Node.js v16.13.0

At this time, you will need a MySQL server locally installed and create databases called "100MB" and "1GB". You will also have to run `set global local_infile=true;` after entering the MySQL command line with `mysql --local-infile=1 -u root -p`. In the future, these will be provided by the Data Lab server.

Run `npm install` to install dependencies

Run `cd TPCH_100MB` then run `node db_config.js` to create the database and tables

Repeat for TPCH_1GB

You can then `cd ..` and run `node app.js` to start the server, navigate to [localhost:8085](https://localhost:8085) in your browser
