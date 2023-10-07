//Express is for building the Rest apis
const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//create an Express app
const app = express();

//cors provides Express middleware to enable CORS with various options.
const cors = require("cors");
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true // allow cookies be accessable
}

));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
const session = require("express-session");

// parse requests of content-type - application/json
app.use(express.json());
app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

// define the routes, should after corsOptions
const auctionRouter = require('./routes/auctions.routes.js');
app.use('/auctions', auctionRouter);

const userRouter = require('./routes/users.routes.js');
app.use('/users', userRouter);

const itemRouter = require('./routes/items.routes.js');
app.use('/items', itemRouter);

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

// set port, listen for requests
const PORT = process.env.PORT || 3001;
// when starting the api, go over every table in the models to make sure all the tables exist, if not create it 
const db = require("./models");
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});










