const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctions.controller.js');
const { validateToken } = require("../middlewares/AuthMiddleware");

// Retrieve all auctions
router.get("/", validateToken, auctionController.findAll);

// Create a new auction
router.post("/", validateToken, auctionController.addAuction);

// Retrieve a single auction with auctionId
router.get("/:id([0-9]+)", validateToken, auctionController.findOneByAuctionId);

// Retrieve all auction relates to one item
router.get("/item/:id([0-9]+)", validateToken, auctionController.findOneByItemId);

module.exports = router;

