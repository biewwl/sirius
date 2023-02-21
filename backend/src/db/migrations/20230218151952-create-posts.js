"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DATA_TYPE) {
    await queryInterface.createTable("posts", {
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
      caption: {
        type: DATA_TYPE.STRING(300),
        allowNull: false,
      },
      date: {
        type: DATA_TYPE.DATE,
        defaultValue: DATA_TYPE.NEW,
      },
      imageUrl: {
        type: DATA_TYPE.STRING,
        allowNull: false,
        field: "image_url"
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("posts");
  },
};
