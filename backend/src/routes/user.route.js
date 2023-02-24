const express = require("express");
const userController = require("../controllers/user.controller");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");
const ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED = require("../middlewares/ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED");

const router = express.Router();

// Get
router.post("/token/login", userController.login);
router.get(
  "/data/account",
  ACCESS_ONLY_WITH_TOKEN,
  userController.getAccountData
);
router.get(
  "/data/profile/:nick",
  validateNickInParamsExists,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  userController.getUserProfile
);

// Post
router.post("/create/register", userController.register, userController.login);

module.exports = router;
