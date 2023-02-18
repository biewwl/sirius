const express = require("express");
const blockController = require("../controllers/block.controller");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");

const router = express.Router();

// Get
router.get(
  "/blocks/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  blockController.getBlockedList
);
router.get(
  "/blocks/count/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  blockController.getBlockedCount
);
router.get(
  "/i-block/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  blockController.iBlockUser
);

// Post
router.post(
  "/block/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  blockController.blockUser
);
router.post(
  "/unblock/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  validateNickInParamsExists,
  blockController.unblockUser
);

module.exports = router;
