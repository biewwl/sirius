const JWT = require("jsonwebtoken");
const validateToken = require("../utils/validateToken");

const ACCESS_ONLY_WITH_TOKEN = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new Error("400 | Lost Authorization");

    const { id, error } = await validateToken(authorization);
    if (error) {
      throw new Error(`400 | Invalid token`);
    }

    req.userId = id;

    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = ACCESS_ONLY_WITH_TOKEN;
