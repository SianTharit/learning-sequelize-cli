const createError = require("../utils/createError");
const { Todo, User } = require("../models");

exports.createTodo = async (req, res, next) => {
    try {
        const { title, completed, dueDate, userId } = req.body;

        // const user = await User.findOne({ where: { id: userId ?? 0 } }); // repeat Code
        // if (!user) {
        //     createError("User not found", 400);
        // }
        const todo = await Todo.create({ title, completed, dueDate, userId });
        res.status(201).json({ todo });
    } catch (err) {
        next(err);
    }
};

exports.getAllTodo = async (req, res, next) => {
    try {
        const { userId } = req.body;
        // const user = await User.findOne({ where: { id: userId ?? 0 } });  // repeat Code สร้างไฟล์แยกชื่อ user.js
        // if (!user) {
        //     createError("user not found", 400);
        // }

        const todos = await Todo.findAll({ where: { userId: userId } });
        res.status(200).json({ todos: todos });
    } catch (err) {
        next(err);
    }
};

exports.getTodoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        // const user = await User.findOne({ where: { id: userId ?? 0 } });  // repeat Code
        // if (!user) {
        //     createError("user not found", 400);
        // }

        const todo = await Todo.findOne({
            where: { id: id, userId: userId },
        });
        res.json({ todo: todo });
    } catch (err) {
        next(err);
    }
};

exports.upDateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, completed, dueDate, userId } = req.body;
        const newValue = {};
        if (title) {
            newValue.title = title;
        }
        if (completed) {
            newValue.completed = completed;
        }
        if (dueDate) {
            newValue.dueDate = dueDate;
        }
        const result = await Todo.update(newValue, {
            where: { id: id, userId: userId },
        });
        console.log(result[0]);
        if (result[0] === 0) {
            createError("todo with this id not found", 400);
        }
        res.json({ message: "update success" });
    } catch (err) {
        next(err);
    }
};

exports.deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const result = await Todo.destroy({
            where: { id: id, userId: userId },
        });
        if (result === 0) {
            createError("todo with this id not found", 400);
        }
        res.status(204).json({ message: "deleted successs" });
    } catch (err) {
        next(err);
    }
};
