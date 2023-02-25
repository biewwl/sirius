const blockService = require("../services/block.service");
const userService = require("../services/user.service");

const listBlocked = async (req, res, next) => {
  try {
    const { userId } = req;
    const blocked = await blockService.listBlocked(userId);

    return res.status(200).json(blocked);
  } catch (error) {
    next(error);
  }
};

const countBlocked = async (req, res, next) => {
  try {
    const { userId } = req;
    const count = await blockService.countBlocked(userId);

    return res.status(200).json(count);
  } catch (error) {
    next(error);
  }
};

const checkIBlock = async (req, res, next) => {
  try {
    const { userId: blockerId } = req;

    const { nick } = req.params;
    const blockedId = await userService.getUserIdByUserNick(nick);

    const iBlock = await blockService.checkBlock(blockerId, blockedId);

    return res.status(200).json(iBlock);
  } catch (error) {
    next(error);
  }
};

const createBlock = async (req, res, next) => {
  try {
    const { userId: blockerId } = req;

    const { nick } = req.params;
    const blockedId = await userService.getUserIdByUserNick(nick);

    const { error } = await blockService.createBlock(blockerId, blockedId);
    if (error) {
      const { code, message } = error;
      throw new Error(`${code} | ${message}`);
    }

    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const deleteBlock = async (req, res, next) => {
  try {
    const { userId: blockerId } = req;

    const { nick } = req.params;
    const blockedId = await userService.getUserIdByUserNick(nick);

    const { error } = await blockService.deleteBlock(blockerId, blockedId);
    if (error) {
      const { code, message } = error;
      throw new Error(`${code} | ${message}`);
    }

    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listBlocked,
  countBlocked,
  checkIBlock,
  createBlock,
  deleteBlock
};
