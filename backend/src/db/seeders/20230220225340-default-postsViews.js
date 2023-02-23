"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "posts_views",
      [
        {
          post_id: 3,
          user_id: 1,
          date: new Date()
        },
        {
          post_id: 1,
          user_id: 3,
          date: new Date()
        },
        {
          post_id: 3,
          user_id: 9,
          date: new Date()
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("posts_views", null, {});
  },
};
