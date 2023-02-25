const express = require("express");
const blockController = require("../controllers/block.controller");
const ACCESS_ONLY_WITH_EXISTENT_NICK = require("../middlewares/ACCESS_ONLY_WITH_EXISTENT_NICK");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");

const router = express.Router();

router.get(
  "/list/blocked",
  ACCESS_ONLY_WITH_TOKEN,
  blockController.listBlocked
);
router.get(
  "/count/blocked",
  ACCESS_ONLY_WITH_TOKEN,
  blockController.countBlocked
);
router.get(
  "/check/i-block/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  blockController.checkIBlock
);
router.post(
  "/create/block/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  blockController.createBlock
);
router.delete(
  "/delete/block/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_ONLY_WITH_EXISTENT_NICK,
  blockController.deleteBlock
);

module.exports = router;
