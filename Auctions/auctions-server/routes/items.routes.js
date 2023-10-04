const express = require('express');
const router = express.Router();
const itemController = require('../controllers/items.controller.js');
const { validateToken } = require("../middlewares/AuthMiddleware");

// Retrieve all items
router.get("/", itemController.findAllItems);

// Create a new item
router.post("/", validateToken, itemController.addItem);

// Retrieve a single item with id
router.get("/:id([0-9]+)", itemController.findOneItemById);

// Delete a item with id
router.delete("/:id([0-9]+)", validateToken, itemController.deleteOneItemById);

// Update a item with id
router.patch("/:id([0-9]+)", itemController.updateOneItemById);


module.exports = router;