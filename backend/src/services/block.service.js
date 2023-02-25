const { Block, User } = require("../db/models");
const error = require("../utils/error");
const followService = require("./follow.service");

const checkBlock = async (blockerId, blockedId) => {
  const block = await Block.findOne({
    where: {
      blockerId,
      blockedId,
    },
  });

  const blockBoolean = block ? true : false;
  return blockBoolean;
};

const listUsersIdUnblocked = async (requesterId, idsList) => {
  const statusBlockFollowers = await Promise.all(
    idsList.map(async (id) => {
      if (!requesterId || requesterId === id) {
        return {
          id,
          status: "unblocked",
        };
      }
      const blocked = await checkBlock(requesterId, id);

      const status = blocked ? "blocked" : "unblocked";
      return { id, status };
    })
  );
  return statusBlockFollowers;
};

const listBlocked = async (userId) => {
  const blocked = await Block.findAll({
    where: {
      blockerId: userId,
    },
    attributes: ["date"],
    include: [
      {
        model: User,
        as: "blocked",
        attributes: {
          exclude: ["id", "email", "password"],
        },
      },
    ],
  });

  return blocked;
};

const countBlocked = async (userId) => {
  const count = await Block.count({
    where: {
      blockerId: userId,
    },
  });

  return count;
};

const createBlock = async (blockerId, blockedId) => {
  const existsBlock = await checkBlock(blockerId, blockedId);

  if (existsBlock) return error(400, "Already block!");

  await followService.deleteFollow(blockedId, blockerId);
  await followService.deleteFollow(blockerId, blockedId);

  const block = await Block.create({
    blockerId,
    blockedId,
  });

  return block;
};

const deleteBlock = async (blockerId, blockedId) => {
  const existsBlock = await checkBlock(blockerId, blockedId);

  if (!existsBlock) return error(400, "Already unblock!");

  const block = await Block.destroy({
    where: {
      blockerId,
      blockedId,
    },
  });

  return block;
};

module.exports = {
  checkBlock,
  listUsersUnblocked: listUsersIdUnblocked,
  listBlocked,
  countBlocked,
  createBlock,
  deleteBlock,
};
