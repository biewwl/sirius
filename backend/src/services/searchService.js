const { Op } = require("sequelize");
const { User } = require("../db/models");

const listSearch = async (query) => {
  const formattedQuery = `%${query}%`;
  const results = await User.findAll({
    where: {
      [Op.or]: [
        { nick: { [Op.like]: formattedQuery } },
        { name: { [Op.like]: formattedQuery } },
      ],
    },
    attributes: { exclude: ["id", "email", "password"] },
  });

  return results;
};

module.exports = { listSearch };
