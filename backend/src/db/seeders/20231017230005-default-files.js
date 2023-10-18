"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const filesData = [
      {
        file_url:
          "https://i.ibb.co/kxcGJnb/C4-D7-BB6-A-C7-FE-4-D18-8627-B24-DA5-C77297.jpg",
        user_id: 1,
        post_id: 1,
      },
      {
        file_url:
          "https://planetofhotels.com/guide/sites/default/files/styles/node__blog_post__bp_banner/public/2020-12/Greece.jpg",
        user_id: 2,
        post_id: 4,
      },
      {
        file_url: "https://i.ibb.co/d583TXk/biewwl.jpg",
        user_id: 1,
        post_id: 5,
      },
      {
        file_url:
          "https://i.ibb.co/ggtPWdc/demon.jpg",
        user_id: 1,
        post_id: 6,
      },
      {
        file_url:
          "https://i.ibb.co/XbZyPSx/Pics-Art-04-03-10-57-43.jpg",
        user_id: 1,
        post_id: 7,
      },
      {
        file_url:
          "https://i.ibb.co/XDDgVkc/Captura-de-tela-de-2022-10-05-23-25-44.png",
        user_id: 1,
        post_id: 8,
      },
      {
        file_url:
          "https://i.ibb.co/8rN5nNv/glasses.jpg",
        user_id: 12,
        post_id: 10,
      },
      {
        file_url:
          "https://i.ibb.co/BTcJktR/IMG-2269.jpg",
        user_id: 12,
        post_id: 11,
      },
      {
        file_url:
          "https://i.ibb.co/RcMXv3H/IMG-2681.jpg",
        user_id: 12,
        post_id: 12,
      },
      {
        file_url:
          "https://i.ibb.co/84MFkKR/5df91347-9e5b-46eb-8791-ff48afebc1f5.jpg",
        user_id: 12,
        post_id: 13,
      },
      {
        file_url:
          "https://asset.kompas.com/crops/j0e7VflyqgwnY8SPYbV-cwTZ6VI=/80x0:925x563/750x500/data/photo/2023/05/26/64702bde005eb.jpg",
        user_id: 12,
        post_id: 14,
      },
    ];

    await queryInterface.bulkInsert("files", filesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("files", null, {});
  },
};
