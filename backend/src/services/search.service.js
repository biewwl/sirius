const { Op } = require("sequelize");
const { User } = require("../db/models");

const findByQuery = async (query, limit) => {
  const formattedQuery = `%${query}%`;
  const results = await User.findAll({
    limit,
    where: {
      [Op.or]: {
        nick: { [Op.like]: formattedQuery },
        name: { [Op.like]: formattedQuery },
      },
    },
    attributes: { exclude: ["id", "email", "password"] },
  });

  return results;
};

const findNickByQuery = async (query, limit) => {
  const formattedQuery = `%${query}%`;
  const results = await User.findAll({
    limit,
    where: {
      [Op.or]: {
        nick: { [Op.like]: formattedQuery },
        name: { [Op.like]: formattedQuery },
      },
    },
    attributes: ["nick"],
  });
  return results;
};

module.exports = { findByQuery, findNickByQuery };
