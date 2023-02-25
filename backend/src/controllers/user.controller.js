const userService = require("../services/user.service");
const followService = require("../services/follow.service");
const postService = require("../services/post.service");

const tokenLogin = async (req, res, next) => {
  try {
    const { nick, password } = req.body;

    if (!nick) throw new Error("400 | Lost nick");
    if (!password) throw new Error("400 | Lost password");

    const approvedLogin = await userService.tokenLogin({ nick, password });

    const { error } = approvedLogin;
    if (error) {
      const { code, message } = error;
      throw new Error(`${code} | ${message}`);
    }

    return res.status(200).json(approvedLogin);
  } catch (error) {
    next(error);
  }
};

const createRegister = async (req, res, next) => {
  try {
    const { name, nick, email, password } = req.body;

    const register = await userService.createRegister({
      name,
      nick,
      email,
      password,
    });

    const { error } = register;
    if (error) {
      const { code, message } = error;
      throw new Error(`${code} | ${message}`);
    }

    return res.status(201).json(register);
  } catch (error) {
    next(error);
  }
};

const dataAccount = async (req, res, next) => {
  try {
    const { userId } = req;
    const userData = await userService.dataProfile(userId);

    const followingCount = await followService.countFollowing(userId);
    const followersCount = await followService.countFollowers(userId);
    const postsCount = await postService.countPosts(userId);

    const completeData = {
      ...userData.dataValues,
      followingCount,
      followersCount,
      postsCount,
    };

    return res.status(200).json(completeData);
  } catch (error) {
    next(error);
  }
};

const dataProfile = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const userId = await userService.getUserIdByUserNick(nick);
    const userData = await userService.dataProfile(userId);

    const followingCount = await followService.countFollowing(userId);
    const followersCount = await followService.countFollowers(userId);
    const postsCount = await postService.countPosts(userId);

    const completeData = {
      ...userData.dataValues,
      followingCount,
      followersCount,
      postsCount,
    };

    return res.status(200).json(completeData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  tokenLogin,
  createRegister,
  dataAccount,
  dataProfile,
};
