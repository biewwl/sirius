const express = require("express");
const userController = require("../controllers/user.controller");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");
const ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED = require("../middlewares/ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED");

const router = express.Router();

// Get
router.get(
  "/account/data",
  ACCESS_ONLY_WITH_TOKEN,
  userController.getAccountData
);
router.get(
  "/profile/:nick",
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  validateNickInParamsExists,
  userController.getUserProfile
);

// Post
router.post("/login", userController.login);
router.post("/register", userController.register, userController.login);

// Put
router.put(
  "/user/data",
  ACCESS_ONLY_WITH_TOKEN,
  userController.updateUserData
);

module.exports = router;
