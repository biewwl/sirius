const { Follow } = require("../db/models");
const { User } = require("../db/models");
const { verifyExistsId } = require("./user.service");

const getFollows = async (id, TYPE) => {
  await verifyExistsId(id);

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

const getFollowsCount = async (id, TYPE) => {
  await verifyExistsId(id);

  const keyName = {
    followers: "receiverId",
    following: "senderId",
  };
  const result = await Follow.findAndCountAll({
    where: { [keyName[TYPE]]: id },
  });

  return result.count;
};

const getFollowersForId = async (receiverId) =>
  await getFollows(receiverId, "followers");

const getFollowersCountForId = async (receiverId) =>
  await getFollowsCount(receiverId, "followers");

const getFollowingForId = async (senderId) =>
  await getFollows(senderId, "following");

const getFollowingCountForId = async (senderId) =>
  await getFollowsCount(senderId, "following");

const followUser = async ({ senderId, receiverId }) => {
  await verifyExistsId(senderId, "exists");
  await verifyExistsId(receiverId, "exists");

  const alreadyFollow = await Follow.findOne({
    where: { senderId, receiverId },
  });

  if (alreadyFollow) throw new Error("500 | Already Follow");

  await Follow.create({
    senderId,
    receiverId,
  });
};

const unfollowUser = async ({ senderId, receiverId }) => {
  await verifyExistsId(senderId, "exists");
  await verifyExistsId(receiverId, "exists");

  const alreadyFollow = await Follow.findOne({
    where: { senderId, receiverId },
  });

  if (!alreadyFollow) throw new Error("500 | Already unfollow");

  await Follow.destroy({
    where: {
      senderId,
      receiverId,
    },
  });
};

module.exports = {
  getFollowersForId,
  getFollowersCountForId,
  getFollowingForId,
  getFollowingCountForId,
  followUser,
  unfollowUser,
};
