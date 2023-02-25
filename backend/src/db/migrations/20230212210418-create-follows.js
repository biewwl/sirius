"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DATA_TYPE) {
    await queryInterface.createTable("follows", {
      id: {
        type: DATA_TYPE.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      senderId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "sender_id",
      },
      receiverId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "receiver_id",
      },
      status: {
        type: DATA_TYPE.STRING,
        allowNull: false,
      },
      date: {
        type: DATA_TYPE.DATE,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("follows");
  },
};
