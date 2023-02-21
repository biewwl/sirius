"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "posts_views",
      [
        {
          post_id: 1,
          views: 18
        },
        {
          post_id: 2,
          views: 20
        },
        {
          post_id: 3,
          views: 25
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("posts_views", null, {});
  },
};
