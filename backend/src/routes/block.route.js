const express = require("express");
const blockController = require("../controllers/block.controller");
const validateToken = require("../middlewares/validateToken");

const router = express.Router();

router.get("/blocks/:nick", validateToken, blockController.getBlocked);
router.get(
  "/blocks/count/:nick",
  validateToken,
  blockController.getBlockedCount
);

router.post("/block/:nick", validateToken, blockController.blockUser);
router.post("/unblock/:nick", validateToken, blockController.unblockUser);

module.exports = router;
