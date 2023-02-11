const { users } = require("../db/models");

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

  return foundUser;
};

module.exports = { login };
