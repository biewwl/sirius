const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

const existInUserTable = async (column, value) => {
  const result = await User.findOne({
    attributes: [column],
    where: { [column]: value },
  });
  return result ? true : false;
};

const login = async ({ nick, password }) => {
  const findNick = await existInUserTable("nick", nick);

  if (!findNick) throw new Error("404 | User not Found!");

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
  const findNick = await existInUserTable("nick", nick);
  const findEmail = await existInUserTable("email", email);

  if (findNick) throw new Error("401 | User already used!");
  if (findEmail) throw new Error("401 | Email already used!");

  const cryptoPass = md5(password);

  await User.create({
    name,
    nick,
    email,
    password: cryptoPass,
  });
};

module.exports = { existInUserTable, login, register };
