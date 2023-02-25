const express = require("express");
const userController = require("../controllers/user.controller");

const ACCESS_ONLY_WITH_EXISTENT_NICK = require("../middlewares/ACCESS_ONLY_WITH_EXISTENT_NICK");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const ACCESS_RESTRICTED = require("../middlewares/ACCESS_RESTRICTED");

const router = express.Router();

// Post
router.post("/token/login", userController.tokenLogin);
router.post("/create/register", userController.createRegister);

// Get
router.get("/data/account", ACCESS_ONLY_WITH_TOKEN, userController.dataAccount);
router.get(
  "/data/profile/:nick",
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  ACCESS_RESTRICTED,
  userController.dataProfile
);

module.exports = router;
