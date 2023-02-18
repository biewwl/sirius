const JWT = require("jsonwebtoken");

const verifyToken = (auth) => {
  const secret = process.env.API_SECRET;
  const payload = JWT.verify(auth, secret);

  const { id } = payload;

  if (!id)
    throw new Error(`${statusCode.BAD_REQUEST_CODE} | Invalid token payload!`);

  return id;
};

module.exports = verifyToken;
