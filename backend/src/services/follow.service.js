const { Follow, User } = require("../db/models");
const error = require("../utils/error");
const userService = require("./user.service");
const blockService = require("./block.service");

const checkFollow = async (senderId, receiverId) => {
  const follow = await Follow.findOne({
    where: {
      senderId,
      receiverId,
      status: "ok",
    },
  });

  const followBoolean = follow ? true : false;
  return followBoolean;
};

const filterAndGetUnblockedUserData = async (requesterId, requestedIds) => {
  const statusBlockFollowers = await blockService.listUsersUnblocked(
    requesterId,
    requestedIds
  );

  const dataFollowers = await Promise.all(
    statusBlockFollowers.map(async (follower) => {
      if (follower.status === "unblocked") {
        const followerData = await userService.dataProfile(follower.id);
        return followerData;
      } else if (follower.status === "blocked") {
        return { error: "Blocked" };
      }
    })
  );

  return dataFollowers;
};

const listFollowers = async (requesterId, requestedId) => {
  const followersIds = await Follow.findAll({
    where: { receiverId: requestedId, status: "ok" },
    include: [
      {
        model: User,
        as: "followers",
        attributes: ["id"],
      },
    ],
    attributes: [],
  });

  const formattedFollowersIds = followersIds.map((follower) => {
    return follower.followers.id;
  });

  const followers = await filterAndGetUnblockedUserData(
    requesterId,
    formattedFollowersIds
  );

  return followers;
};

const countFollowers = async (requestedId) => {
  const count = Follow.count({
    where: { receiverId: requestedId },
  });
  return count;
};

const listFollowing = async (requesterId, requestedId) => {
  const followingIds = await Follow.findAll({
    where: { senderId: requestedId, status: "ok" },
    include: [
      {
        model: User,
        as: "following",
        attributes: ["id"],
      },
    ],
    attributes: [],
  });

  const formattedFollowingIds = followingIds.map((following) => {
    return following.following.id;
  });

  const following = await filterAndGetUnblockedUserData(
    requesterId,
    formattedFollowingIds
  );

  return following;
};

const countFollowing = async (requestedId) => {
  const count = Follow.count({
    where: { senderId: requestedId },
  });
  return count;
};

const createFollow = async (senderId, receiverId) => {
  const receiverAccountPrivacy = await userService.getAccountPrivacy(
    receiverId
  );

  const existsFollow = await Follow.findOne({
    where: {
      senderId,
      receiverId,
    },
  });
  if (existsFollow) return error(400, "Already follow");

  let status;

  if (receiverAccountPrivacy === "private") status = "pending";
  if (receiverAccountPrivacy === "public") status = "ok";

  const follow = await Follow.create({
    senderId,
    receiverId,
    status,
  });

  return follow;
};

const deleteFollow = async (senderId, receiverId) => {
  const existsFollow = await Follow.findOne({
    where: {
      senderId,
      receiverId,
    },
  });

  if (!existsFollow) return error(400, "Already unfollow");

  const follow = await Follow.destroy({
    where: {
      senderId,
      receiverId,
    },
  });

  return follow;
};

const rejectFollow = async (senderId, receiverId) => {
  const existsFollowRequest = await Follow.findOne({
    where: {
      senderId,
      receiverId,
      status: "pending",
    },
  });
  if (!existsFollowRequest) return error(400, "No follow request");

  const follow = await Follow.destroy({
    where: { senderId, receiverId },
  });

  return follow;
};

const acceptFollow = async (senderId, receiverId) => {
  console.log(senderId, receiverId);
  const existsFollowRequest = await Follow.findOne({
    where: {
      senderId,
      receiverId,
      status: "pending",
    },
  });
  if (!existsFollowRequest) return error(400, "No follow request");

  const follow = await Follow.update(
    { status: "ok" },
    { where: { senderId, receiverId } }
  );

  return follow;
};

module.exports = {
  listFollowers,
  countFollowers,
  listFollowing,
  countFollowing,
  checkFollow,
  createFollow,
  deleteFollow,
  rejectFollow,
  acceptFollow,
};
