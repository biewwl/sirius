const JWT = require("jsonwebtoken");
const statusCode = require("../utils/statusCode");

const validateAccessWithoutLogin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const secret = process.env.API_SECRET;
      const payload = JWT.verify(authorization, secret);

      const { id } = payload;

      if (!id)
        throw new Error(
          `${statusCode.BAD_REQUEST_CODE} | Invalid token payload!`
        );

      req.userId = id;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateAccessWithoutLogin;
