"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "posts_comments",
      [
        {
          post_id: 2,
          user_id: 1,
          comment: "Great!"
        },
        {
          post_id: 1,
          user_id: 3,
          comment: "Oh man this is"
        },
        {
          post_id: 3,
          user_id: 9,
          comment: "Get on the table"
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("posts_comments", null, {});
  },
};
