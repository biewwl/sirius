const { verifyUserBlock } = require("../services/block.service");
const { getUserIdByNick } = require("../services/user.service");
const userService = require("../services/user.service");

const getOnlyPermittedUsersList = async (requesterId, nicksArray) => {
  let nicks = nicksArray;
  if (requesterId) {
    const nicksWithBlockedResult = await Promise.all(
      nicksArray.map(async (nick) => {
        const blockerId = await getUserIdByNick(nick);
        const isBlocked = await verifyUserBlock({
          blockerId,
          blockedId: requesterId,
        });
        return { nick, isBlocked };
      })
    );
    const filteredResults = nicksWithBlockedResult.filter(
      (nickAndIsBlocked) => !nickAndIsBlocked.isBlocked
    );
    const extractedNicks = filteredResults.map(
      (nickAndIsBlocked) => nickAndIsBlocked.nick
    );
    nicks = extractedNicks;
  }
  const onlyPermittedUsersList = await Promise.all(
    nicks.map(async (nick) => {
      const userData = await userService.getUserByNick(nick, ["id"]);
      return userData;
    })
  );
  return onlyPermittedUsersList;
};

module.exports = getOnlyPermittedUsersList;
