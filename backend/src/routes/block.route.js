const express = require("express");
const blockController = require("../controllers/block.controller");
const validateToken = require("../middlewares/validateToken");
const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");

const router = express.Router();

router.get(
  "/blocks/:nick",
  validateToken,
  validateNickInParamsExists,
  blockController.getBlocked
);
router.get(
  "/blocks/count/:nick",
  validateToken,
  validateNickInParamsExists,
  blockController.getBlockedCount
);

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
