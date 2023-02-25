const { User } = require("../db/models");
const error = require("../utils/error");
const md5 = require("md5");
const generateToken = require("../utils/generateToken");

const getUserIdByUserNick = async (nick) => {
  const user = await User.findOne({
    where: { nick },
    attributes: ["id"],
  });

  const { id } = user;

  return id;
};

const getAccountPrivacy = async (userId) => {
  const account = await User.findOne({
    where: { id: userId },
    attributes: ["accountPrivacy"],
  });

  const { accountPrivacy } = account;

  return accountPrivacy;
};

const checkExistsUser = async (field, value) => {
  const exists = await User.findOne({
    where: { [field]: value },
    attributes: [field],
  });
  const existsBoolean = exists ? true : false;
  return existsBoolean;
};

const validateToken = async ({ id, nick }) => {
  const validateUserId = await checkExistsUser("id", id);
  if (!validateUserId) return error(400, "Invalid token");

  const validateUserNick = User.findOne({
    where: { id, nick },
    attributes: ["id"],
  });
  if (!validateUserId) return error(400, "Invalid token");

  return validateUserNick;
};

const tokenLogin = async ({ nick, password }) => {
  const validateUserNick = await checkExistsUser("nick", nick);
  if (!validateUserNick) return error(404, "Nick not found");

  const cryptoPassword = md5(password);
  const validateUserPassword = await User.findOne({
    where: { nick, password: cryptoPassword },
    attributes: ["id"],
  });
  if (!validateUserPassword) return error(400, "Wrong password");

  const { id } = validateUserPassword;
  const token = generateToken({ id, nick });

  return token;
};

const createRegister = async ({ name, nick, email, password }) => {
  const validateUserNick = await checkExistsUser("nick", nick);
  if (validateUserNick) return error(404, "Nick already register");

  const validateUserEmail = await checkExistsUser("email", email);
  if (validateUserEmail) return error(404, "Email already register");

  const register = await User.create({
    name,
    nick,
    email,
    password,
  });
};

const dataProfile = async (userId) => {
  const data = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ["id", "password", "email"] },
  });

  return data;
};

module.exports = {
  getUserIdByUserNick,
  getAccountPrivacy,
  checkExistsUser,
  validateToken,
  tokenLogin,
  createRegister,
  dataProfile,
};
