const createError = require("../utils/createError");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

// exports.register = async (req, res, next) => {
//     try {
//         // const body = req.body;
//         const { username, email, password, confirmPassword } = req.body;
//         if (password !== confirmPassword) {
//             createError("password didn't match", 400);
//             // return res.status(400).json({ message: "password didn't match" });
//         }

//         // Create new user
//         await User.create({ username, email, password });
//         res.status(201).json({ message: "register success" });
//     } catch (err) {
//         next(err);
//     }
// };

exports.userRegisterBcrypt = async (req, res, next) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (!password) {
            createError("password is require", 400);
        }
        if (password.length < 6) {
            createError("password must be at least 6 characters", 400); // Check before ==> hash password
        }
        if (password !== confirmPassword) {
            createError("password didn't match", 400);
        }
        // console.log(password);
        const hashed = await bcrypt.hash(password, 8);
        await User.create({ username, email, password: hashed });
        res.status(200).json({ message: "register success" });
    } catch (err) {
        next(err);
    }
};

exports.userLoginBcrypt = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username) {
            createError("username is required", 400);
        }
        if (!password) {
            createError("password is required", 400);
        }
        const user = await User.findOne({ where: { username } });
        if (!user) {
            createError("invalid username or password", 400);
        }
        // if (user.username !== username) {
        //     createError("username not found", 400); // check username จาก where ข้างบนไปแล้ว
        // }

        // console.log(password);
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            res.status(200).json({ message: `Hello ${user.username}` });
        } else {
            res.status(400).json({ message: "invalid username or password" });
        }
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            email,
            oldPassword,
            newPassword,
            confirmNewPassword,
            birthDate,
        } = req.body;
        const user = await User.findOne({ where: { id } });
        if (!user) {
            createError("user is not found", 400);
        }

        if (oldPassword !== user.password) {
            createError("Incorrect password", 400);
        }

        if (newPassword !== confirmNewPassword) {
            createError("password did not match", 400);
        }

        await User.update(
            { email, password: newPassword, birthDate },
            { where: { id } }
        );

        // const { username, password, email, birthDate } =
        //     req.body;
        // const user = await User.findOne({ where: { username } });
        // if (user === username) {
        //     await user.update({
        //         password,
        //         email,
        //         birthDate,
        //     });
        // } else {
        //     console.log("user not found");
        // }
        res.json({ message: "update success" });
    } catch (err) {
        next(err);
    }
};
