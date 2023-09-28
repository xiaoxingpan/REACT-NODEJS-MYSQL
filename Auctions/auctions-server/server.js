//Express is for building the Rest apis
const express = require("express");

//cors provides Express middleware to enable CORS with various options.
const cors = require("cors");

//create an Express app
const app = express();
const bodyParser = require('body-parser');

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// allow frontend app at http://localhost:3000 to make requests to backend at http://localhost:3001
var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// define the routes, should after corsOptions
require('./routes/auctionsrestAPI.routes.js')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });


// //logger npmlog
// const logger = require("npmlog");









