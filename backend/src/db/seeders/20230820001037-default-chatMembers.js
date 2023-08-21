'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('chat_members', [
      {
        user_id: 1,
        chat_id: 1,
      },
      {
        user_id: 2,
        chat_id: 1,
      },
      {
        user_id: 2,
        chat_id: 2,
      },
      {
        user_id: 3,
        chat_id: 2,
      },
      {
        user_id: 1,
        chat_id: 3,
      },
      {
        user_id: 1,
        chat_id: 2,
      },
      {
        user_id: 1,
        chat_id: 4,
      },
      {
        user_id: 12,
        chat_id: 4,
      },
      {
        user_id: 12,
        chat_id: 5,
      },
      {
        user_id: 1,
        chat_id: 5,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('chat_members', null, {});
  },
};
