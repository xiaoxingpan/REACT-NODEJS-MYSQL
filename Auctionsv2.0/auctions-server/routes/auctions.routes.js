const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctions.controller.js');
const { validateToken } = require("../middlewares/AuthMiddleware");


// router.get("/", (req, res) => {
//     res.send("hello!");
// });

// Retrieve all auctions
router.get("/", auctionController.findAll);

// Create a new auction
router.post("/", validateToken, auctionController.addAuction);

// Retrieve a single auction with id
router.get("/:id([0-9]+)", auctionController.findOneById);

// Update a auction with id
router.patch("/:id([0-9]+)", validateToken, auctionController.bid);

module.exports = router;

