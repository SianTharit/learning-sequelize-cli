const express = require("express");
const todoController = require("../controllers/todoController");
const userMiddleware = require("../middlewares/user");

const router = express.Router();
router.post("/", userMiddleware.getUserById, todoController.createTodo);
router.get("/", userMiddleware.getUserById, todoController.getAllTodo);
router.get("/:id", userMiddleware.getUserById, todoController.getTodoById);
router.put("/:id", todoController.upDateTodo);
router.put("/:id", todoController.deleteTodo);

module.exports = router;
