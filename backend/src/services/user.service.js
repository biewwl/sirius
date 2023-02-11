const { users } = require("../db/models");
const jwt = require('jsonwebtoken');

const login = async (nick, password) => {
  const findNick = await users.findOne({
    attributes: ['nick'],
    where: { nick },
  });

  if (!findNick) throw new Error("User not found!");

  const foundUser = await users.findOne({
    attributes: ['name', 'nick', 'password'],
    where: { nick, password }
  });

  if (!foundUser) throw new Error("Wrong Password!");

  const secret = process.env.API_SECRET;
  const token = jwt.sign(foundUser.dataValues, secret);

  return token;
};

module.exports = { login };
