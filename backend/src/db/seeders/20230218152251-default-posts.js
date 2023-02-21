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
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
