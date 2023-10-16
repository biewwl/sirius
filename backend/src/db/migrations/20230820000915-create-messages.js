'use strict';

module.exports = {
  up: async (queryInterface, DATA_TYPE) => {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DATA_TYPE.INTEGER,
      },
      message: {
        type: DATA_TYPE.STRING,
        allowNull: false,
      },
      senderId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "sender_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      seen: {
        type: DATA_TYPE.BOOLEAN,
        defaultValue: false,
      },
      excludeBySender: {
        type: DATA_TYPE.BOOLEAN,
        defaultValue: false,
      },
      respondingMessage: {
        type: DATA_TYPE.INTEGER,
      },
      excludeByRecipient: {
        type: DATA_TYPE.BOOLEAN,
        defaultValue: false,
      },
      chatId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        references: {
          model: 'chats',
          key: 'id',
        },
      },
      date: {
        type: DATA_TYPE.DATE,
        defaultValue: DATA_TYPE.NOW,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('messages');
  },
};
