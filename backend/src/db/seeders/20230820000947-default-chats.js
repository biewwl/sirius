'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('chats', [
      {
        type: 'private',
        name: null,
      },
      {
        type: 'group',
        name: 'Grupo de Trabalho',
      },
      {
        type: 'private',
        name: null,
      },
      {
        type: 'group',
        name: "Família",
      },
      {
        type: 'private',
        name: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('chats', null, {});
  },
};
