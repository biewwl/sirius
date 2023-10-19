"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DATA_TYPE) {
    await queryInterface.createTable("users", {
      id: {
        type: DATA_TYPE.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DATA_TYPE.STRING(30),
        allowNull: false,
      },
      nick: {
        type: DATA_TYPE.STRING(30),
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DATA_TYPE.STRING(30),
        allowNull: false,
      },
      password: {
        type: DATA_TYPE.STRING(50),
        allowNull: false,
      },
      avatarUrl: {
        type: DATA_TYPE.STRING,
        field: "avatar_url",
      },
      coverUrl: {
        type: DATA_TYPE.STRING,
        field: "cover_url",
      },
      accountPrivacy: {
        type: DATA_TYPE.STRING,
        field: "account_privacy",
        defaultValue: "public"
      },
      accountVerified: {
        type: DATA_TYPE.STRING,
        field: "account_verified",
        defaultValue: "none"
      },
      theme: {
        type: DATA_TYPE.STRING,
        field: "theme",
        defaultValue: "#1877F2"
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
