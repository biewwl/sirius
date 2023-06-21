"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "stories",
      [
        {
          user_id: 3,
          date: new Date(),
          content_url:
            "https://static.poder360.com.br/2021/08/messi-contrato-barcelona.jpg",
        },
        {
          user_id: 10,
          date: new Date(),
          content_url:
            "https://media.fashionnetwork.com/m/c5fd/4ba6/722f/8e46/4519/07a6/f2c0/6589/3983/08a3/08a3.jpg",
        },
        {
          user_id: 8,
          date: new Date(),
          content_url: "https://i.redd.it/4rt9ynv8hor91.jpg",
        },
        {
          user_id: 5,
          date: new Date(),
          content_url:
            "https://media.wired.com/photos/5926ff22f3e2356fd800b20a/master/w_2560%2Cc_limit/Gboard.gif",
        },
        {
          user_id: 7,
          date: new Date(),
          content_url:
            "https://thumbs.gfycat.com/AdmiredPositiveAiredaleterrier-size_restricted.gif",
        },
        {
          user_id: 9,
          date: new Date(),
          content_url:
            "https://s3.amazonaws.com/bit-photos/large/14449365.jpeg",
        },
        {
          user_id: 11,
          date: new Date(),
          content_url:
            "https://trivela.com.br/wp-content/uploads/2023/05/Jordi-Alba-Barcelona.jpg",
        },
        {
          user_id: 6,
          date: new Date(),
          content_url:
            "https://web3news.com.br/images/noticias/441/20032633_unnamed.jpg",
        },
        {
          user_id: 6,
          date: new Date(),
          content_url:
            "https://classic.exame.com/wp-content/uploads/2020/02/mat-de-cp-1-2.jpg?quality=70&strip=info&w=1024",
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("stories", null, {});
  },
};
