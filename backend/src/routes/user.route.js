const express = require("express");
const userController = require("../controllers/user.controller");
const validateToken = require("../middlewares/validateToken");

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register, userController.login);
router.get("/account/data", validateToken, userController.accountData);

module.exports = router;
