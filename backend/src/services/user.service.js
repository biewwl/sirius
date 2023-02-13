const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

const getUserBy = async (field, value) => {
  const user = await User.findOne({
    where: { [field]: value },
    attributes: { exclude: ["email", "password"] },
  });
  if (!user) return null;

  return user.dataValues;
};

const verifyExists = async (field, value, CASE) => {
  const user = await getUserBy(field, value);
  if (CASE === "exists") {
    if (!user) throw new Error(`404 | ${field} not Found!`);
  }
  if (CASE === "nonexistent") {
    if (user) throw new Error(`404 | ${field} already exists!`);
  }
};

const getUserIdByNick = async (nick) => {
  await verifyExistsNick(nick, "exists");
  const user = await User.findOne({
    where: { nick },
    attributes: ["id"],
  });
  return user.dataValues.id;
};

const getUserById = async (id) => await getUserBy("id", id);

const verifyExistsId = async (id, CASE) => await verifyExists("id", id, CASE);

const getUserByNick = async (nick) => await getUserBy("nick", nick);

const verifyExistsNick = async (nick, CASE) =>
  await verifyExists("nick", nick, CASE);

const getUserByEmail = async (email) => await getUserBy("email", email);

const verifyExistsEmail = async (email, CASE) =>
  await verifyExists("email", email, CASE);

const login = async ({ nick, password }) => {
  await verifyExistsNick(nick, "exists");
  const cryptoPass = md5(password);
  const foundUser = await User.findOne({
    attributes: ["id", "name", "nick", "password"],
    where: { nick, password: cryptoPass },
  });
  if (!foundUser) throw new Error("401 | Wrong Password!");
  const secret = process.env.API_SECRET;
  const token = jwt.sign(foundUser.dataValues, secret);
  return token;
};

const register = async ({ name, nick, email, password }) => {
  await verifyExistsNick(nick, "nonexistent");
  await verifyExistsEmail(email, "nonexistent");
  const cryptoPass = md5(password);
  await User.create({
    name,
    nick,
    email,
    password: cryptoPass,
  });
};

module.exports = {
  getUserById,
  getUserIdByNick,
  verifyExistsId,
  getUserByNick,
  verifyExistsNick,
  getUserByEmail,
  verifyExistsEmail,
  login,
  register,
};
