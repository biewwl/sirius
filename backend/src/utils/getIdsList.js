const { getUserIdByNick } = require("../services/user.service");

const getIdsList = async (queriesReturn) => {
  const nicks = queriesReturn.map((queryReturn) => {
    const {
      dataValues: { following },
    } = queryReturn;
    const { nick } = following;
    return nick;
  });
  const ids = await Promise.all(nicks.map((nick) => getUserIdByNick(nick)));
  return ids;
};

module.exports = getIdsList;
