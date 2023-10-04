const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller.js');

// Retrieve all users
router.get("/", userController.findAll);

// Create a new user
router.post("/", userController.addUser);

// Authentic a user
router.post("/auth", userController.authUser);

module.exports = router;