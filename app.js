const express = require("express"); // express server
const server = express();
const bodyParser = require("body-parser"); // body-parser

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://serverDB:server@archerhunts.lmgolam.mongodb.net/archer\'s_hunt'); // Database Link

server.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
server.use(express.json({ limit: "50mb" }));

const handlebars = require("express-handlebars"); // handlebars compatability
server.set("view engine", "hbs");
server.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
  })
);

server.use(express.static("public")); // static fils in public folder

const fs = require("fs"); // File System
const path = require("path"); // Paths System
server.use("/assets", express.static(path.join(__dirname, "assets")));

const session = require('express-session');
const mongoStore = require('connect-mongodb-session')(session);

server.use(session({
  secret: 'a secret fruit',
  saveUninitialized: true, 
  resave: false,
  store: new mongoStore({ 
    uri: 'mongodb+srv://serverDB:server@archerhunts.lmgolam.mongodb.net/archer\'s_hunt',
    collection: 'mySession',
    expires: 1000*60*60 // 1 hour
  })
}));

function getControllerPaths(pathname = "./Controller") {
  // function to get controllers
  let array = [];

  try {
    const files = fs.readdirSync(pathname);
    files.forEach(file => {
      array.push(file);
    });
  } catch (err) {
    console.error("error", err);
  }

  return array;
}

let controllerPaths = getControllerPaths();

for (let path of controllerPaths) {
  console.log("Processing Controllers: " + path);
  const controller = require("./Controller/" + path);

  controller.add(server);
}

function finalClose(){
  console.log('Close connection at the end!');
  mongoose.connection.close();
  process.exit();
}

process.on('SIGTERM',finalClose);  //general termination signal
process.on('SIGINT',finalClose);   //catches when ctrl + c is used
process.on('SIGQUIT', finalClose); //catches other termination commands

const port = process.env.PORT | 3000;
server.listen(port, function () {
  console.log("Listening at port " + port);
});
