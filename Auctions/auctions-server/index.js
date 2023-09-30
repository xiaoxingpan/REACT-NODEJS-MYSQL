//Express is for building the Rest apis
const express = require("express");

//create an Express app
const app = express();

//cors provides Express middleware to enable CORS with various options.
const cors = require("cors");
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));

// // allow frontend app at http://localhost:3000 to make requests to backend at http://localhost:3001
// var corsOptions = {
//     origin: "http://localhost:3000"
// };

const db = require("./models");

// define the routes, should after corsOptions
const auctionRouter = require('./routes/auctions.routes.js');
app.use('/auctions', auctionRouter);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});










