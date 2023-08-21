const chatService = require("../services/chats.service");
const statusCode = require("../utils/statusCode");
const userService = require("../services/user.service");

const getChatsByUserId = async (req, res, next) => {
  try {
    const { userId } = req;

    const chats = await chatService.getChatsByUserId(userId);

    res.status(statusCode.SUCCESS_CODE).json(chats);
  } catch (error) {
    next(error);
  }
};

const getChatById = async (req, res, next) => {
  try {
    const { chatId } = req.params;

    const chatInfo = await chatService.getChatById(chatId);

    res.status(statusCode.SUCCESS_CODE).json(chatInfo);
  } catch (error) {
    next(error);
  }
};

const getPrivateChatByUsersIds = async (req, res, next) => {
  try {
    const {
      userId,
      params: { nick },
    } = req;

    const id = await userService.getUserIdByNick(nick);

    const chats = await chatService.getPrivateChatByUsersIds(userId, id);

    res.status(statusCode.SUCCESS_CODE).json(chats);
  } catch (error) {
    next(error);
  }
};

const getMessageId = async (req, res, next) => {
  try {
    const { messageId } = req.params;

    const message = await chatService.getMessageId(messageId);

    res.status(statusCode.SUCCESS_CODE).json(message);
  } catch (error) {
    next(error);
  }
};

const createChat = async (req, res, next) => {
  try {
    const {
      userId,
      body: { type, name, anotherMember },
    } = req;
    if (!type) throw new Error("Define a type for your chat");
    if (type === "group" && !name) throw new Error("Group chats needs a name");
    if (type === "private") {
      if (name) throw new Error("Unnecessary 'name'");
      if (!anotherMember && typeof anotherMember !== "string") {
        throw new Error("Add only a another member");
      }
    }
    const anotherMemberId = await userService.getUserIdByNick(anotherMember);
    if (type === "private") {
      const existChat = await chatService.getPrivateChatByUsersIds(
        userId,
        anotherMemberId
      );
      if (existChat) return res.status(statusCode.SUCCESS_CODE).json(existChat);
    }

    const chatMembers = [userId, anotherMemberId];

    const chat = await chatService.createChat({ type, name, chatMembers });

    res.status(statusCode.SUCCESS_CODE).json(chat);
  } catch (error) {
    next(error);
  }
};

const createMessage = async (req, res, next) => {
  try {
    const {
      userId,
      io,
      body: { chatId, message, respondingMessage },
    } = req;

    if (!chatId || !message) {
      throw new Error("Invalid body");
    }

    const createdMessage = await chatService.createMessage({
      chatId,
      message,
      respondingMessage,
      senderId: userId,
    });

    res.status(statusCode.SUCCESS_CODE).json(createdMessage);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getChatsByUserId,
  getChatById,
  getPrivateChatByUsersIds,
  getMessageId,
  createChat,
  createMessage,
};
