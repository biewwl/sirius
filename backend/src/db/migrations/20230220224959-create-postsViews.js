"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DATA_TYPE) {
    await queryInterface.createTable("posts_views", {
      postId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: "post_id",
      },
      views: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "views",
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("posts_views");
  },
};
