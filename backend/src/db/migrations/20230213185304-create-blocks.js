"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DATA_TYPE) {
    await queryInterface.createTable("blocks", {
      id: {
        type: DATA_TYPE.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      blockerId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "blocker_id",
      },
      blockedId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "blocked_id",
      },
      date: {
        type: DATA_TYPE.DATE,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("blocks");
  },
};
