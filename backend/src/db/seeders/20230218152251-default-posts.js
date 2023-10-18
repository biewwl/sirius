"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const postsData = [
      {
        user_id: 1,
        caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        date: new Date(),
      },
      {
        user_id: 1,
        caption: "Somebody, someone I don't know, but if I try, I swear to God...",
        date: new Date(),
      },
      {
        user_id: 1,
        caption: "“I was told when I get older all my fears would shrink, but now I'm insecure and I care what people think .”",
        date: new Date(),
      },
      {
        user_id: 2,
        caption: "Another day traveling...",
        date: new Date(),
      },
      {
        user_id: 1,
        caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        date: new Date(),
      },
      {
        user_id: 1,
        caption: "YES",
        date: new Date(),
      },
      {
        user_id: 1,
        caption: "With the mask",
        date: new Date(),
      },
      {
        user_id: 1,
        caption: "The last",
        date: new Date(),
      },
      {
        user_id: 1,
        caption: "Hate this music!",
        date: new Date(),
      },
      {
        user_id: 12,
        caption: "😻",
        date: new Date(),
      },
      {
        user_id: 12,
        caption: "🤍",
        date: new Date(),
      },
      {
        user_id: 12,
        caption: "♨️",
        date: new Date(),
      },
      {
        user_id: 12,
        caption: "😻",
        date: new Date(),
      },
      {
        user_id: 2,
        caption: "This was one of the most epic journeys, that I've got myself involved in. Maybe one of the most memorable in my entire life!",
        date: new Date(),
      },
    ];

    await queryInterface.bulkInsert("posts", postsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
