const userService = require("../services/user.service");
const validateFormRegister = require("../middlewares/schemas/registerJoi");
const statusCode = require("../utils/statusCode");

const login = async (req, res, next) => {
  try {
    const { nick, password } = req.body;
    const response = await userService.login({ nick, password });
    return res.status(statusCode.SUCCESS_CODE).json(response);
  } catch (error) {
    next(error);
  }
};

const register = async (req, _res, next) => {
  try {
    const { name, nick, email, password } = req.body;
    const formData = { name, nick, email, password };
    const { error } = validateFormRegister(formData);
    if (error) throw new Error(error.message);
    await userService.register(formData);
    next();
  } catch (error) {
    next(error);
  }
};

const getAccountData = async (req, res, next) => {
  try {
    const { userId } = req;
    const userData = await userService.getUserById(userId);
    res.status(statusCode.SUCCESS_CODE).json(userData);
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const { nick } = req.params;
    const userData = await userService.getUserByNick(nick);
    res.status(statusCode.SUCCESS_CODE).json(userData);
  } catch (error) {
    next(error);
  }
};

const updateUserData = async (req, res, next) => {
  try {
    const { userId } = req;
    const userData = req.body;

    await userService.updateUserData(userId, userData);

    res.status(statusCode.SUCCESS_CODE).json(userData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
  getAccountData,
  getUserProfile,
  updateUserData,
};
