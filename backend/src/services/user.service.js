const { users } = require("../db/models");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

const existInDB = async (column, value) => {
  const result = await users.findOne({
    attributes: [column],
    where: { [column]: value },
  });
  return result ? true : false;
};

const login = async ({ nick, password }) => {
  const findNick = await existInDB("nick", nick);

  if (!findNick) throw new Error("404 | User not Found!");

  const cryptoPass = md5(password);

  const foundUser = await users.findOne({
    attributes: ["name", "nick", "password"],
    where: { nick, password: cryptoPass },
  });

  if (!foundUser) throw new Error("401 | Wrong Password!");

  const secret = process.env.API_SECRET;
  const token = jwt.sign(foundUser.dataValues, secret);

  return token;
};

const register = async ({ name, nick, email, password }) => {
  const findNick = await existInDB("nick", nick);
  const findEmail = await existInDB("email", email);

  if (findNick) throw new Error("401 | User already used!");
  if (findEmail) throw new Error("401 | Email already used!");

  const cryptoPass = md5(password);

  await users.create({
    name,
    nick,
    email,
    password: cryptoPass,
  });
};

module.exports = { login, register };
