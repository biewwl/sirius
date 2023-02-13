const { Follow } = require("../db/models");
const { User } = require("../db/models");
const { existInUserTable } = require("./user.service");

const getFollowers = async (receiverId) => {
  const result = await Follow.findAll({
    where: { receiverId },
    attributes: ["date"],
    include: [
      {
        model: User,
        as: "follower",
        attributes: ["nick", "id"],
      },
    ],
  });
  return result;
};

const getFollowing = async (senderId) => {
  const result = await Follow.findAll({
    where: { senderId },
    attributes: ["date"],
    include: [
      {
        model: User,
        as: "following",
        attributes: ["nick", "id"],
      },
    ],
  });
  return result;
};

const verifyExistUser = async (userId) => {
  const exists = await existInUserTable("id", userId);
  if (!exists) throw new Error("404 | User not found!");
  return exists;
};

const followUser = async ({ senderId, receiverId }) => {
  await verifyExistUser(senderId);
  await verifyExistUser(receiverId);

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
  await verifyExistUser(senderId);
  await verifyExistUser(receiverId);

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

module.exports = { getFollowers, getFollowing, followUser, unfollowUser };
