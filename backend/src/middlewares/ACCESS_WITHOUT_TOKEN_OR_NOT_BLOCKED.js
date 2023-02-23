const { verifyExistsId } = require("../services/user.service");
const verifyBlock = require("../utils/verifyBlock");
const verifyToken = require("../utils/verifyToken");

const ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    const { nick } = req.params;

    if (authorization) {
      const requesterId = verifyToken(authorization);
      await verifyExistsId(requesterId, "exists");
      req.userId = requesterId;
      if (nick) {
        const { error } = await verifyBlock(requesterId, nick);
        if (error) throw new Error(error);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = ACCESS_WITHOUT_TOKEN_OR_NOT_BLOCKED;
