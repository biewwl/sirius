"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "posts_shares",
      [
        {
          post_id: 1,
          sender_id: 1,
          recipient_id: 7
        },
        {
          post_id: 1,
          sender_id: 4,
          recipient_id: 8
        },
        {
          post_id: 2,
          sender_id: 9,
          recipient_id: 1
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("posts_shares", null, {});
  },
};
