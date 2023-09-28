module.exports = app => {
    const auctions = require("../controller/auctions.controller.js");

    var router = require("express").Router();

    // Retrieve all auctions
    router.get("/", auctions.findAll);

    // Create a new auction
    router.post("/", auctions.create);

    // Retrieve a single auction with id
    router.get("/:id([0-9]+)", auctions.findOneById);

    // Update a auction with id
    router.patch("/:id([0-9]+)", auctions.update);

    // Define the prefix
    app.use('/api/auctions', router);
};