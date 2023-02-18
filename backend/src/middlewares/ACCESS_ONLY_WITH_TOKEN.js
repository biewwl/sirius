const JWT = require("jsonwebtoken");
const { verifyExistsId } = require("../services/user.service");
const statusCode = require("../utils/statusCode");

const ACCESS_ONLY_WITH_TOKEN = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      throw new Error(`${statusCode.BAD_REQUEST_CODE} | Lost Authorization`);

    const secret = process.env.API_SECRET;
    const payload = JWT.verify(authorization, secret);

    const { id } = payload;

    if (!id)
      throw new Error(
        `${statusCode.BAD_REQUEST_CODE} | Invalid token payload!`
      );

    await verifyExistsId(Number(id), "exists");

    req.userId = id;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = ACCESS_ONLY_WITH_TOKEN;
