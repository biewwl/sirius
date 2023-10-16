'use strict';

module.exports = {
  up: async (queryInterface, DATA_TYPE) => {
    await queryInterface.createTable('chat_members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DATA_TYPE.INTEGER,
      },
      userId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "user_id",
      },
      chatId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "chat_id",
        references: {
          model: 'chats',
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('chat_members');
  },
};
