"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Gabriel Dias",
          nick: "biel",
          email: "gabriel.dias.fern@gmail.com",
          password: "25d55ad283aa400af464c76d713c07ad", // 12345678
          avatar_url:
            "https://i.ibb.co/kxcGJnb/C4-D7-BB6-A-C7-FE-4-D18-8627-B24-DA5-C77297.jpg",
          cover_url:
            "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2FsbHBhcGVyJTIwNGt8ZW58MHx8MHx8&w=1000&q=80",
          account_privacy: "private",
          account_verified: "identity",
        },
        {
          name: "Elon Musk",
          nick: "elon",
          email: "elon@gmail.com",
          password: "25d55ad283aa400af464c76d713c07ad", // 12345678
          avatar_url:
            "https://conteudo.imguol.com.br/c/noticias/ca/2022/07/22/elon-musk-abril-de-2022-em-visita-a-united-states-air-force-academy-no-colorado-1658489751191_v2_1x1.jpg",
          cover_url:
            "https://cdn.vox-cdn.com/thumbor/AeCRmHw2hyxAibEHoqGExIW7fow=/0x0:1180x776/1400x1400/filters:focal(590x388:591x389)/cdn0.vox-cdn.com/uploads/chorus_asset/file/9205955/Screen_Shot_2017_09_08_at_4.34.18_PM.png",
          account_privacy: "public",
          account_verified: "public_figure",
        },
        {
          name: "Lionel Messi",
          nick: "leomessi",
          email: "messi@gmail.com",
          password: "493ebe3a91a10564a7b955d00534234e", // goat1234
          avatar_url:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Lionel_Messi_WC2022.jpg/640px-Lionel_Messi_WC2022.jpg",
          cover_url:
            "https://images.livemint.com/img/2023/02/02/1600x900/France-Soccer-League-One-0_1675297246432_1675297246432_1675297277565_1675297277565.jpg",
          account_privacy: "public",
          account_verified: "public_figure",
        },
        {
          name: "Neymar",
          nick: "ney",
          email: "neymay@gmail.com",
          password: "493ebe3a91a10564a7b955d00534234e", // goat1234
          avatar_url:
            "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt0248ffbcdc996f03/62ceea2eb90e3e0f6e7a6596/Neymar_PSG_Marseille_2021-22.jpg",
          cover_url:
            "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltfd6f22d9d0494112/638e44e494eb720b623aec72/GettyImages-1446977379.jpg",
          account_privacy: "private",
          account_verified: "public_figure",
        },
        {
          name: "Google",
          nick: "google",
          email: "google@gmail.com",
          password: "25d55ad283aa400af464c76d713c07ad", // 12345678
          avatar_url:
            "http://expresswriters.com/wp-content/uploads/2015/09/google-new-logo-450x450.jpg",
          cover_url:
            "https://i.pinimg.com/originals/2d/6b/9d/2d6b9d7145b42697d47c4fc11e7fa2ca.jpg",
          account_privacy: "public",
          account_verified: "company",
        },
        {
          name: "Trybe",
          nick: "trybe",
          email: "trybe@gmail.com",
          password: "25d55ad283aa400af464c76d713c07ad", // 12345678
          avatar_url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8eHMDI2hW1eiwtcrvs3tQYkNgxSDisd1G2RmIq_6dUwPFIrmXYJ_pTmU7pe1mwP-whmM&usqp=CAU",
          cover_url:
            "https://media.licdn.com/dms/image/C4D12AQHcCacpP_-rdQ/article-cover_image-shrink_600_2000/0/1592713157708?e=2147483647&v=beta&t=ZCJ5eGrV9tOR1GUz-4tDfGOvDOZQG3zRdWmfaachfUM",
          account_privacy: "public",
          account_verified: "company",
        },
        {
          name: "Jenna Ortega",
          nick: "jenna",
          email: "jenna@gmail.com",
          password: "25d55ad283aa400af464c76d713c07ad", // 12345678
          avatar_url:
            "https://s2.glbimg.com/0kj0OG49M5BmHMeOXlKOMP0BZ4E=/0x0:1080x1072/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_ba3db981e6d14e54bb84be31c923b00c/internal_photos/bs/2022/H/E/HWE1OzQH6dLthAVSe5cg/jenna-ortega.jpg",
          cover_url:
            "https://image.europafm.com/clipping/cmsimages01/2022/12/01/F121291C-53D0-433D-8B84-3A78EB104F6C/transformacion-jenna-ortega-chica-disney-chica-burton_98.jpg?crop=3771,2122,x0,y198&width=1900&height=1069&optimize=high&format=webply",
          account_privacy: "public",
          account_verified: "public_figure",
        },
        {
          name: "BoyWithUke",
          nick: "boywithuke",
          email: "boywithuke@gmail.com",
          password: "25d55ad283aa400af464c76d713c07ad", // 12345678
          avatar_url:
            "https://www.billboard.com/wp-content/uploads/2022/02/BoyWithUke-cr-Brian-Ziff-press-2022-billboard-1548.jpg",
          cover_url:
            "https://www.udiscovermusic.com/wp-content/uploads/2022/03/BOYWITHUKE-Credit-Brian-Ziff.jpg",
          account_privacy: "public",
          account_verified: "public_figure",
        },
        {
          name: "Machine Gun Kelly",
          nick: "mgk",
          email: "mgk@gmail.com",
          password: "25d55ad283aa400af464c76d713c07ad", // 12345678
          avatar_url:
            "https://i.scdn.co/image/ab6761610000e5eb1fd54eb6e30d0bc8f633621e",
          cover_url:
            "https://www.ofuxico.com.br/wp-content/uploads/2022/01/machinegunkelly.jpg",
          account_privacy: "public",
          account_verified: "public_figure",
        },
        {
          name: "Shein",
          nick: "shein",
          email: "shein@gmail.com",
          password: "25d55ad283aa400af464c76d713c07ad", // 12345678
          avatar_url:
            "https://bk.ibxk.com.br/2022/01/27/27144706197336.jpg",
          cover_url:
            "https://editalconcursosbrasil.com.br/wp-content/uploads/2022/05/shein.jpg",
          account_privacy: "public",
          account_verified: "company",
        },
        {
          name: "FC Barcelona",
          nick: "fcb",
          email: "barcelona@gmail.com",
          password: "25d55ad283aa400af464c76d713c07ad", // 12345678
          avatar_url:
            "https://static-wp-tor15-prd.torcedores.com/wp-content/uploads/2022/09/barcelona-logo.jpg",
          cover_url:
            "https://frontofficesports.com/wp-content/uploads/2022/06/FOS-PM-6.28.22-Barca-2.jpg",
          account_privacy: "public",
          account_verified: "company",
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
