const searchService = require("../services/search.service");
const userService = require("../services/user.service");
const statusCode = require("../utils/statusCode");
const { verifyUserBlock } = require("../services/block.service");
const { getUserIdByNick } = require("../services/user.service");
const getOnlyPermittedUsersList = require("../utils/getOnlyPermittedUsersList");
const { formatSearch } = require("../utils");

const findByQuery = async (req, res, next) => {
  try {
    const { query, limit, offset } = req.query;
    const { userId } = req;

    // STEP 1: Get the matches nick
    const resultsNick = await searchService.findNickByQuery(
      query,
      limit,
      offset
    );
    // STEP 2: Get the users data by nick
    const onlyPermittedUsers = formatSearch(resultsNick);
    const usersData = await getOnlyPermittedUsersList(
      userId,
      onlyPermittedUsers
    );
    res.status(statusCode.SUCCESS_CODE).json(usersData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findByQuery,
};
