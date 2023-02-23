const { User } = require("../db/models");

const userWithoutSensitiveFields = (as) => ({
  model: User,
  as,
  attributes: ["name", "nick", "avatarUrl", "accountVerified"],
});

module.exports = { userWithoutSensitiveFields };
