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
          comment: "Chlorine",
          date: new Date()
        },
        {
          post_id: 3,
          user_id: 2,
          comment: "Stressed out",
          date: new Date()
        },
        {
          post_id: 3,
          user_id: 6,
          comment: "Heathens",
          date: new Date()
        },
        {
          post_id: 3,
          user_id: 10,
          comment: "House of Gold",
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
