const express = require("express");
const blockController = require("../controllers/block.controller");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");

const router = express.Router();

// Get
router.get(
  "/list/blocked/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  blockController.getBlockedList
);
router.get(
  "/count/blocked/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  blockController.getBlockedCount
);
router.get(
  "/check/block/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  blockController.iBlockUser
);

// Post
router.post(
  "/create/block/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  blockController.blockUser
);

// Delete
router.delete(
  "/delete/block/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  blockController.unblockUser
);

module.exports = router;
