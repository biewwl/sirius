"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "blocks",
      [
        {
          blocker_id: 1,
          blocked_id: 2,
        },
        {
          blocker_id: 2,
          blocked_id: 1,
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("blocks", null, {});
  },
};
