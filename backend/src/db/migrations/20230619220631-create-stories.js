"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DATA_TYPE) {
    await queryInterface.createTable("stories", {
      id: {
        type: DATA_TYPE.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "user_id"
      },
      date: {
        type: DATA_TYPE.DATE,
        defaultValue: DATA_TYPE.NEW,
      },
      contentUrl: {
        type: DATA_TYPE.STRING,
        allowNull: false,
        field: "content_url"
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("stories");
  },
};
