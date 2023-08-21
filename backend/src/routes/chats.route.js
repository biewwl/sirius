const validateNickInParamsExists = require("../middlewares/validateNickInParamsExists");
const express = require("express");
const router = express.Router();
const chatsController = require("../controllers/chats.controller");
const ACCESS_ONLY_WITH_TOKEN = require("../middlewares/ACCESS_ONLY_WITH_TOKEN");
const ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED = require("../middlewares/ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED");

router.get("/chats", ACCESS_ONLY_WITH_TOKEN, chatsController.getChatsByUserId);

router.get(
  "/chat/:chatId",
  ACCESS_ONLY_WITH_TOKEN,
  chatsController.getChatById
);

router.get(
  "/chat/private/:nick",
  ACCESS_ONLY_WITH_TOKEN,
  ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED,
  chatsController.getPrivateChatByUsersIds
);

router.get(
  "/chat/message/:messageId",
  ACCESS_ONLY_WITH_TOKEN,
  chatsController.getMessageId
);

router.post(
  "/chat/create",
  ACCESS_ONLY_WITH_TOKEN,
  chatsController.createChat
);

router.post(
  "/chat/create/message",
  ACCESS_ONLY_WITH_TOKEN,
  chatsController.createMessage
);

module.exports = router;
