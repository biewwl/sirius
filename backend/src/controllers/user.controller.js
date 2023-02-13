const userService = require("../services/user.service");
const followService = require("../services/follow.service");
const validateRegister = require("../middlewares/schemas/registerJoi");
const formatFollows = require("../utils");

const login = async (req, res, next) => {
  try {
    const { nick, password } = req.body;
    const response = await userService.login({ nick, password });
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const register = async (req, _res, next) => {
  try {
    const { name, nick, email, password } = req.body;
    const formData = { name, nick, email, password };

    const { error } = validateRegister(formData);
    if (error) throw new Error(error.message);

    await userService.register(formData);
    next();
  } catch (error) {
    next(error);
  }
};

const accountData = async (req, res, next) => {
  try {
    const { userId } = req;
    const userData = await userService.getUserById(userId);

    const getFollowers = await followService.getFollowers(userId);
    const getFollowing = await followService.getFollowing(userId);
    const followers = formatFollows(getFollowers, "follower");
    const following = formatFollows(getFollowing, "following");

    res.status(200).json({ ...userData, followers, following });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register, accountData };
