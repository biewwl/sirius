"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "posts_likes",
      [
        {
          post_id: 3,
          user_id: 1
        },
        {
          post_id: 1,
          user_id: 3
        },
        {
          post_id: 3,
          user_id: 9
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("posts_likes", null, {});
  },
};
