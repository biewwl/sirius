'use strict';

module.exports = {
  up: async (queryInterface, DATA_TYPE) => {
    await queryInterface.createTable('chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DATA_TYPE.INTEGER,
      },
      type: {
        type: DATA_TYPE.ENUM('private', 'group'),
        allowNull: false,
      },
      name: {
        type: DATA_TYPE.STRING,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('chats');
  },
};
