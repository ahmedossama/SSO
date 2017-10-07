// get the packages we need ============
// =======================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config.js'); // get our config file



// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8000; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
process.on('uncaughtException', function (err) {
    console.log("General error triggered");
  console.log(err);
})

// throw new Error("Can't divide by zero")



// =======================
// start the server ======
// =======================
app.listen(port);
require('./routes/routes.js')(app)
console.log('Magic happens at http://localhost:' + port);

