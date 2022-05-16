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
        const { oldTitle, newTitle, completed, dueDate, id } = req.body;
        console.log(req.body);
        const user = await Todo.findOne({ where: { id: id ?? 0 } });
        console.log(user);
        if (!user) {
            createError("title is not found", 400);
        }
        if (!oldTitle) {
            createError("title is not found", 400);
        }

        await Todo.update(
            {
                title: newTitle,
                completed,
                dueDate,
            },
            { where: { id } }
        );
        res.json({ message: "update success" });
    } catch (err) {
        next(err);
    }
};

exports.deleteTodo = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
};
