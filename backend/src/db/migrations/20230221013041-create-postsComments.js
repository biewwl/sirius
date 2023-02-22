"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DATA_TYPE) {
    await queryInterface.createTable("posts_comments", {
      id: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      postId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "post_id"
      },
      userId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "user_id"
      },
      comment: {
        type: DATA_TYPE.STRING(50),
        allowNull: false,
        defaultValue: 0,
        field: "comment"
      },
      date: {
        type: DATA_TYPE.DATE,
        defaultValue: DATA_TYPE.NOW,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("posts_comments");
  },
};
