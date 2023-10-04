const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todos.controller.js');
// const { validateToken } = require("../middlewares/AuthMiddleware.js");


// Retrieve all todos
router.get("/", todoController.findAll);

// Create a new todo
router.post("/", todoController.addTodo);

// Retrieve a single todo with id
router.get("/:id([0-9]+)", todoController.findOneById);

// Update a todo with id
router.patch("/:id([0-9]+)", todoController.updateOneTodoById);

// Delete a todo with id
router.delete("/:id([0-9]+)", todoController.deleteOneTodoById);

// Retrieve all todos relates to one user
router.get("/user/:id([0-9]+)", todoController.findAllByUserId);

module.exports = router;

