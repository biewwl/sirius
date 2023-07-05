"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "posts",
      [
        {
          user_id: 1,
          caption:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          date: new Date(),
          image_url:
            "https://i.ibb.co/kxcGJnb/C4-D7-BB6-A-C7-FE-4-D18-8627-B24-DA5-C77297.jpg",
        },
        {
          user_id: 2,
          caption:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          date: new Date(),
          image_url:
            "https://media.gq.com/photos/5ecfe04091d7f9d7fa10db02/1:1/w_2257,h_2257,c_limit/SpaceX-Space-Suits-gq-may-2020--.jpg",
        },
        {
          user_id: 1,
          caption:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          date: new Date(),
          image_url: "https://i.ibb.co/d583TXk/biewwl.jpg",
        },
        {
          user_id: 1,
          caption: "YES",
          date: new Date(),
          image_url: "https://i.ibb.co/ggtPWdc/demon.jpg",
        },
        {
          user_id: 1,
          caption: "With the mask",
          date: new Date(),
          image_url: "https://i.ibb.co/XbZyPSx/Pics-Art-04-03-10-57-43.jpg",
        },
        {
          user_id: 1,
          caption: "The last",
          date: new Date(),
          image_url:
            "https://i.ibb.co/XDDgVkc/Captura-de-tela-de-2022-10-05-23-25-44.png",
        },
        {
          user_id: 12,
          caption: "😻",
          date: new Date(),
          image_url: "https://i.ibb.co/8rN5nNv/glasses.jpg",
        },
        {
          user_id: 12,
          caption: "🤍",
          date: new Date(),
          image_url: "https://i.ibb.co/BTcJktR/IMG-2269.jpg",
        },
        {
          user_id: 12,
          caption: "♨️",
          date: new Date(),
          image_url: "https://i.ibb.co/RcMXv3H/IMG-2681.jpg",
        },
        {
          user_id: 12,
          caption: "😻",
          date: new Date(),
          image_url:
            "https://i.ibb.co/84MFkKR/5df91347-9e5b-46eb-8791-ff48afebc1f5.jpg",
        },
        {
          user_id: 2,
          caption:
            "This was one of the most epic journeys, that i've got myself involved in. Maybe one of the most memorable in my entire life!",
          date: new Date(),
          image_url:
            "https://asset.kompas.com/crops/j0e7VflyqgwnY8SPYbV-cwTZ6VI=/80x0:925x563/750x500/data/photo/2023/05/26/64702bde005eb.jpg",
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
