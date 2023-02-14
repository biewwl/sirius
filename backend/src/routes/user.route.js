const express = require("express");
const userController = require("../controllers/user.controller");
const validateAccessWithoutLogin = require("../middlewares/validateAccessWithoutLogin");
const checkAccessIsBlocked = require("../middlewares/checkAccessIsBlocked");
const validateToken = require("../middlewares/validateToken");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");

const router = express.Router();

// Get
router.get("/account/data", validateToken, userController.accountData);
router.get(
  "/profile/:nick",
  validateAccessWithoutLogin,
  validateNickInParamsExists,
  checkAccessIsBlocked,
  userController.userProfile
);

// Post
router.post("/login", userController.login);
router.post("/register", userController.register, userController.login);

module.exports = router;
