'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "sender_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      seen: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      excludeBySender: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      respondingMessage: {
        type: Sequelize.INTEGER,
      },
      excludeByRecipient: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      chatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'chats',
          key: 'id',
        },
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('messages');
  },
};
