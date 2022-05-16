const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// POST /users/register
// router.post("/register", userController.register);
router.post("/register", userController.userRegisterBcrypt);
// login
router.post("/login", userController.userLoginBcrypt);
// PUT /users
router.put("/:id", userController.updateUser);

module.exports = router;
