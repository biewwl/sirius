const JWT = require("jsonwebtoken");
const userService = require("../services/user.service");

const validateToken = async (authorization) => {
  try {
    const secret = process.env.API_SECRET;
    const payload = JWT.verify(authorization, secret);
    const { id, nick } = payload;
    if (!id || !nick) throw new Error("400 | Invalid token!");

    const { error } = await userService.validateToken({ id, nick });

    if (error) return { error };

    return { id, nick };
  } catch (error) {
    return { error };
  }
};

module.exports = validateToken;
