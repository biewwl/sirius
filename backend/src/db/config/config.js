require("dotenv").config();

const environment = process.env.NODE_ENV || "test";

const suffix = {
  dev: "-dev",
  development: "-dev",
  test: "-test",
};

const options = {
  host: process.env.HOSTNAME || process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_PORT || "3306",
  database: `${process.env.MYSQL_DB_NAME || "reactgram"}${
    suffix[environment] || suffix.test
  }`,
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "1234",
  dialect: "mysql",
  dialectOptions: {
    dateStrings: true,
    typeCast: function (field, next) {
      if (field.type === "DATE") {
        return field.string();
      }
      return next();
    },
  },
  timezone: "-03:00",
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
};
