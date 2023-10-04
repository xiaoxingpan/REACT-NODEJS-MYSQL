//Express is for building the Rest apis
const express = require("express");

//create an Express app
const app = express();

//cors provides Express middleware to enable CORS with various options.
const cors = require("cors");
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());



// define the routes, should after corsOptions
const toduRouter = require('./routes/todos.routes.js');
app.use('/todos', toduRouter);

const userRouter = require('./routes/users.routes.js');
app.use('/users', userRouter);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
// when starting the api, go over every table in the models to make sure all the tables exist, if not create it 
const db = require("./models");
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});










