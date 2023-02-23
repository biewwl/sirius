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
          comment: "Great!",
          date: new Date()
        },
        {
          post_id: 1,
          user_id: 3,
          comment: "Oh man this is",
          date: new Date()
        },
        {
          post_id: 3,
          user_id: 9,
          comment: "Get on the table",
          date: new Date()
        },
        {
          post_id: 3,
          user_id: 2,
          comment: "Crazy boy",
          date: new Date()
        },
        {
          post_id: 3,
          user_id: 6,
          comment: "Bye Bye",
          date: new Date()
        },
        {
          post_id: 3,
          user_id: 10,
          comment: "Send a direct",
          date: new Date()
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("posts_comments", null, {});
  },
};
