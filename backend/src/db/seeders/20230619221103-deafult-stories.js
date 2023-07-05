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
            "https://image.cnbcfm.com/api/v1/image/107178919-1673854215895-gettyimages-669463000-shutterstock_621020393.jpeg?v=1674003106",
        },
        {
          user_id: 10,
          date: new Date(),
          content_url:
            "https://imgix.bustle.com/rehost/2016/9/13/5dcc1edc-547a-4a85-a810-b6f08b4c90b5.jpg?w=800&fit=crop&crop=faces&auto=format%2Ccompress",
        },
        {
          user_id: 8,
          date: new Date(),
          content_url: "https://thriftytraveler.com/wp-content/uploads/2019/05/luca-micheli-422052-unsplash.jpg",
        },
        {
          user_id: 5,
          date: new Date(),
          content_url:
            "https://www.budgetyourtrip.com/blog/wp-content/uploads/2019/03/france_paris_notre_dame-1920x1280.jpg",
        },
        {
          user_id: 7,
          date: new Date(),
          content_url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR36NTa4NqiBjiknGRT7y7G42_H9GL58n5qZg&usqp=CAU",
        },
        {
          user_id: 12,
          date: new Date(),
          content_url:
            "https://i.ibb.co/84MFkKR/5df91347-9e5b-46eb-8791-ff48afebc1f5.jpg",
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("stories", null, {});
  },
};
