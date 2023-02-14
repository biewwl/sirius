const { Block } = require("../db/models");
const { User } = require("../db/models");
const { verifyExistsId } = require("./user.service");

const getBlocked = async (id) => {
  await verifyExistsId(id);

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
  await verifyExistsId(id);

  const result = await Block.findAndCountAll({
    where: { blockerId: id },
  });

  return result.count;
};

const getBlockedForId = async (blockerId) => await getBlocked(blockerId);

const getBlockedCountForId = async (blockerId) =>
  await getBlockedCount(blockerId);

const verifyUserBlock = async ({ blockerId, blockedId }) => {
  const alreadyBlocked = await Block.findOne({
    where: { blockerId, blockedId },
  });
  if (alreadyBlocked) return true;
  return false;
};

const blockUser = async ({ blockerId, blockedId }) => {
  await verifyExistsId(blockerId, "exists");
  await verifyExistsId(blockedId, "exists");

  const alreadyBlocked = await verifyUserBlock({ blockerId, blockedId });

  if (alreadyBlocked) throw new Error("500 | Already Blocked");

  await Block.create({
    blockerId,
    blockedId,
  });
};

const unblockUser = async ({ blockerId, blockedId }) => {
  await verifyExistsId(blockerId, "exists");
  await verifyExistsId(blockedId, "exists");

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
  getBlockedForId,
  getBlockedCountForId,
  verifyUserBlock,
  blockUser,
  unblockUser,
};
