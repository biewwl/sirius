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
    nicks = nicksWithBlockedResult;

    const onlyPermittedUsersList = await Promise.all(
      nicks.map(async (obj) => {
        const { nick, isBlocked } = obj;
        const userData = await userService.getUserByNick(nick, ["id"]);
        if (isBlocked) return { error: "Not Found" };
        return userData;
      })
    );
    nicks = onlyPermittedUsersList;
  }
  return nicks;
};

module.exports = getOnlyPermittedUsersList;
