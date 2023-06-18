"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "follows",
      [
        {
          sender_id: 1,
          receiver_id: 3,
          status: "following"
        },
        {
          sender_id: 3,
          receiver_id: 1,
          status: "following"
        },
        {
          sender_id: 2,
          receiver_id: 3,
          status: "following"
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("follows", null, {});
  },
};
