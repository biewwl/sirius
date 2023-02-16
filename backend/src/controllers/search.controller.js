const searchService = require("../services/search.service");
const userService = require("../services/user.service");
const statusCode = require("../utils/statusCode");
const { verifyUserBlock } = require("../services/block.service");
const { getUserIdByNick } = require("../services/user.service");

const findByQuery = async (req, res, next) => {
  try {
    const { query, limit, offset } = req.query;
    const { userId } = req;

    // STEP 1: Get the matches nick
    const resultsNick = await searchService.findNickByQuery(query, limit, offset);

    // STEP 2: Get the users data by nick
    const usersData = await Promise.all(
      resultsNick.map(async (nickResult) => {
        const { nick } = nickResult.dataValues;
        if (userId) {
          const blockerId = await getUserIdByNick(nick);
          const getterIsBlockedByFoundUser = await verifyUserBlock({
            blockerId,
            blockedId: userId,
          });
          if (getterIsBlockedByFoundUser) {
            return { nick, blocked: true };
          }
        }
        const userData = await userService.getUserByNick(nick, ["id"]);
        return userData;
      })
    );
    res.status(statusCode.SUCCESS_CODE).json(usersData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findByQuery,
};
