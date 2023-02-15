const { Block } = require("../db/models");
const { User } = require("../db/models");
const statusCode = require("../utils/statusCode");

///////////////////////////////
// GET BLOCKED LIST IN DATABASE
///////////////////////////////

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

const getBlockedListForId = async (blockerId) =>
  await getBlockedList(blockerId);

///////////////////////////////
// GET BLOCKED COUNT IN DATABASE
///////////////////////////////

const getBlockedCount = async (id) => {
  const result = await Block.findAndCountAll({
    where: { blockerId: id },
  });
  return result.count;
};

const getBlockedCountForId = async (blockerId) =>
  await getBlockedCount(blockerId);

///////////////////////////////
// VERIFY ALREADY BLOCKED USER /
///////////////////////////////

const verifyUserBlock = async ({ blockerId, blockedId }) => {
  const alreadyBlocked = await Block.findOne({
    where: { blockerId, blockedId },
  });
  return alreadyBlocked ? true : false;
};

///////////////////////////////
////////// ACTIONS ////////////
///////////////////////////////

const blockUser = async ({ blockerId, blockedId }) => {
  // STEP 1: Verify if already blocked
  const alreadyBlocked = await verifyUserBlock({ blockerId, blockedId });
  if (alreadyBlocked)
    throw new Error(`${statusCode.BAD_REQUEST_CODE} | Already Blocked`);

  // STEP 2: Do block
  await Block.create({
    blockerId,
    blockedId,
  });
};

const unblockUser = async ({ blockerId, blockedId }) => {
  // STEP 1: Verify if already blocked
  const alreadyBlocked = await verifyUserBlock({ blockerId, blockedId });
  if (!alreadyBlocked)
    throw new Error(`${statusCode.BAD_REQUEST_CODE} | Already Blocked`);

  // STEP 2: Do unblock
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
