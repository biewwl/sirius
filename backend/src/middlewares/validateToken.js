const JWT = require("jsonwebtoken");
const { verifyExistsId } = require("../services/user.service");

const validateToken = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new Error("401 | Lost Authorization");

    const secret = process.env.API_SECRET;
    const payload = JWT.verify(authorization, secret);

    const { id } = payload;

    if (!id) throw new Error("500 | Invalid token payload!");

    await verifyExistsId(Number(id), "exists")

    req.userId = id;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateToken;
