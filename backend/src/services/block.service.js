const { Block } = require("../db/models");
const { User } = require("../db/models");

const getBlockedList = async (id) => {
  const result = await Block.findAll({
    where: { blockerId: id },
    attributes: ["date"],
    include: [
      {
        model: User,
        as: "blocked",
        attributes: ["nick"],
      },
    ],
  });
  return result;
};

const getBlockedCount = async (id) => {
  const result = await Block.findAndCountAll({
    where: { blockerId: id },
  });
  return result.count;
};

const getBlockedListForId = async (blockerId) =>
  await getBlockedList(blockerId);

const getBlockedCountForId = async (blockerId) =>
  await getBlockedCount(blockerId);

const verifyUserBlock = async ({ blockerId, blockedId }) => {
  const alreadyBlocked = await Block.findOne({
    where: { blockerId, blockedId },
  });
  return alreadyBlocked ? true : false;
};

const blockUser = async ({ blockerId, blockedId }) => {
  const alreadyBlocked = await verifyUserBlock({ blockerId, blockedId });
  if (alreadyBlocked) throw new Error("500 | Already Blocked");
  await Block.create({
    blockerId,
    blockedId,
  });
};

const unblockUser = async ({ blockerId, blockedId }) => {
  const alreadyBlocked = await Block.findOne({
    where: { senderId, receiverId },
  });
  if (!alreadyBlocked) throw new Error("500 | Already Blocked");
  await Block.destroy({
    where: {
      blockerId,
      blockedId,
    },
  });
};

module.exports = {
  getBlockedListForId,
  getBlockedCountForId,
  verifyUserBlock,
  blockUser,
  unblockUser,
};
