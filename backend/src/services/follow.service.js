const { Op } = require("sequelize");
const { Follow } = require("../db/models");
const { User } = require("../db/models");
const statusCode = require("../utils/statusCode");
const { getUserById } = require("./user.service");

///////////////////////////////
// GET FOLLOW LIST IN DATABASE
///////////////////////////////

// Generic function to get user followers e following list by "id"
const getFollowsList = async (id, limit, offset, TYPE) => {
  const keyName = {
    followers: "receiverId",
    following: "senderId",
  };
  const result = await Follow.findAll({
    where: {
      [keyName[TYPE]]: id,
      status: {
        [Op.not]: "pending",
      },
    },
    limit,
    offset,
    attributes: ["date"],
    include: [
      {
        model: User,
        as: TYPE,
        attributes: ["nick"],
      },
    ],
  });
  return result;
};

// Function to get followers list by "id"
const getFollowersListById = async (receiverId, limit, offset) =>
  await getFollowsList(receiverId, limit, offset, "followers");

// Function to get following list by "id"
const getFollowingListById = async (senderId, limit, offset) =>
  await getFollowsList(senderId, limit, offset, "following");

///////////////////////////////
// GET FOLLOW COUNT IN DATABASE
///////////////////////////////

// Generic function to get user followers e following count by "id"
const getFollowsCount = async (id, TYPE) => {
  const keyName = {
    followers: "receiverId",
    following: "senderId",
  };
  const count = await Follow.count({
    where: {
      [keyName[TYPE]]: id,
      status: {
        [Op.not]: "pending",
      },
    },
  });

  return count;
};

// Function to get followers count by "id"
const getFollowersCountById = async (receiverId) =>
  await getFollowsCount(receiverId, "followers");

// Function to get following count by "id"
const getFollowingCountById = async (senderId) =>
  await getFollowsCount(senderId, "following");

///////////////////////////////
// VERIFY ALREADY FOLLOW USER /
///////////////////////////////

// Function to verify if user follow another user by "id"
const alreadyFollowUser = async (senderId, receiverId) => {
  const followRegister = await Follow.findOne({
    where: {
      senderId,
      receiverId,
    },
  });
  let status = "not following";

  if (followRegister) {
    const followStatus = followRegister.dataValues.status;
    if (followStatus === "pending" || followStatus === "following") {
      status = followStatus;
    }
  }
  return status;
};

///////////////////////////////
////////// ACTIONS ////////////
///////////////////////////////

const followUser = async ({ senderId, receiverId }) => {
  // STEP 1: Verify if already follow
  const alreadyFollow = await alreadyFollowUser(senderId, receiverId);
  if (alreadyFollow === "following")
    throw new Error(`${statusCode.BAD_REQUEST_CODE} | Already Follow`);

  // STEP 2: Verify target privacy account
  const targetUser = await getUserById(receiverId);
  const targetUserPrivacy = await targetUser.accountPrivacy;
  const status = targetUserPrivacy === "public" ? "following" : "pending";

  // STEP 3: Do follow
  await Follow.create({
    senderId,
    receiverId,
    status,
  });
};

const unfollowUser = async ({ senderId, receiverId }) => {
  // STEP 1: Verify if already unfollow
  const alreadyFollow = await alreadyFollowUser(senderId, receiverId);
  if (alreadyFollow === "not following")
    throw new Error(`${statusCode.BAD_REQUEST_CODE} | Already unfollow`);

  // STEP 2: Do unfollow
  await Follow.destroy({
    where: {
      senderId,
      receiverId,
    },
  });
};

module.exports = {
  getFollowersListById,
  getFollowersCountById,
  getFollowingListById,
  getFollowingCountById,
  alreadyFollowUser,
  followUser,
  unfollowUser,
};
