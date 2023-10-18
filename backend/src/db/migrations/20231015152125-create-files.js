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
      fileUrl: {
        type: DATA_TYPE.STRING,
        allowNull: false,
        field: "file_url",
      },
      userId: {
        type: DATA_TYPE.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      postId: {
        type: DATA_TYPE.INTEGER,
        field: "post_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "posts",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('files');
  },
};
