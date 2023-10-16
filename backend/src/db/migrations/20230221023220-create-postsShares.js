"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DATA_TYPE) {
    await queryInterface.createTable("posts_shares", {
      id: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      postId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "post_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "posts",
          key: "id",
        },
      },
      senderId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "sender_id",
      },
      recipientId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "recipient_id",
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("posts_shares");
  },
};
