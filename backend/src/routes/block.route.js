const express = require("express");
const blockController = require("../controllers/block.controller");
const validateToken = require("../middlewares/validateToken");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");

const router = express.Router();

// Get
router.get(
  "/blocks/:nick",
  validateToken,
  validateNickInParamsExists,
  blockController.getBlockedList
);
router.get(
  "/blocks/count/:nick",
  validateToken,
  validateNickInParamsExists,
  blockController.getBlockedCount
);
router.get(
  "/i-block/:nick",
  validateToken,
  validateNickInParamsExists,
  blockController.iBlockUser
);

// Post
router.post(
  "/block/:nick",
  validateToken,
  validateNickInParamsExists,
  blockController.blockUser
);
router.post(
  "/unblock/:nick",
  validateToken,
  validateNickInParamsExists,
  blockController.unblockUser
);

module.exports = router;
