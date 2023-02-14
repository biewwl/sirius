const { Follow } = require("../db/models");
const { User } = require("../db/models");

///////////////////////////////
// GET FOLLOW LIST IN DATABASE
///////////////////////////////

// Generic function to get user followers e following list by "id"
const getFollowsList = async (id, TYPE) => {
  const keyName = {
    followers: "receiverId",
    following: "senderId",
  };
  const result = await Follow.findAll({
    where: { [keyName[TYPE]]: id },
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
const getFollowersListById = async (receiverId) =>
  await getFollowsList(receiverId, "followers");

// Function to get following list by "id"
const getFollowingListById = async (senderId) =>
  await getFollowsList(senderId, "following");

///////////////////////////////
// GET FOLLOW COUNT IN DATABASE
///////////////////////////////

// Generic function to get user followers e following count by "id"
const getFollowsCount = async (id, TYPE) => {
  const keyName = {
    followers: "receiverId",
    following: "senderId",
  };
  const result = await Follow.findAndCountAll({
    where: { [keyName[TYPE]]: id },
  });

  return result.count;
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
    where: { senderId, receiverId },
  });
  return followRegister ? true : false;
};

///////////////////////////////
////////// ACTIONS ////////////
///////////////////////////////

const followUser = async ({ senderId, receiverId }) => {
  // STEP 1: Verify if already follow
  const alreadyFollow = await alreadyFollowUser(senderId, receiverId);
  if (alreadyFollow) throw new Error("401 | Already Follow");

  // STEP 2: Do follow
  await Follow.create({
    senderId,
    receiverId,
  });
};

const unfollowUser = async ({ senderId, receiverId }) => {
  // STEP 1: Verify if already unfollow
  const alreadyFollow = await alreadyFollowUser(senderId, receiverId);
  if (!alreadyFollow) throw new Error("401 | Already unfollow");

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
