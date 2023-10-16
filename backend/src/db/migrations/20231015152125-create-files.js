'use strict';

module.exports = {
  up: async (queryInterface, DATA_TYPE) => {
    await queryInterface.createTable('files', {
      id: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DATA_TYPE.STRING,
        allowNull: false,
      },
      folder: {
        type: DATA_TYPE.STRING,
        allowNull: false,
      },
      userId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "user_id",
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('files');
  },
};
