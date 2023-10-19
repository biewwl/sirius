"use strict";

module.exports = {
  async up(queryInterface, _Sequelize) {
    const users = [
      {
        name: "Gabriel Dias",
        nick: "biel",
        email: "gabriel.dias.fern@gmail.com",
        password: "25d55ad283aa400af464c76d713c07ad", // 12345678
        avatar_url:
          "https://i.ibb.co/kxcGJnb/C4-D7-BB6-A-C7-FE-4-D18-8627-B24-DA5-C77297.jpg",
        cover_url:
          "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2FsbHBhcGVyJTIwNGt8ZW58MHx8MHx8&w=1000&q=80",
        account_privacy: "public",
        account_verified: "identity",
        theme: "#3b3a30", // Cor estática para Gabriel Dias
      },
      {
        name: "Paul Davies",
        nick: "paul",
        email: "paul@gmail.com",
        password: "25d55ad283aa400af464c76d713c07ad", // 12345678
        avatar_url:
          "https://us.123rf.com/450wm/deagreez/deagreez2107/deagreez210700195/171115142-photo-of-young-weirdo-man-look-staring-empty-space-eyewear-wear-sweater-isolated-on-blue-color.jpg?ver=6",
        cover_url:
          "https://bloximages.newyork1.vip.townnews.com/oanow.com/content/tncms/assets/v3/editorial/4/a6/4a6d53c6-ca7f-5427-a014-c259cbccd954/645285c0616ae.image.jpg?resize=1280%2C720",
        account_privacy: "public",
        account_verified: "public_figure",
        theme: "#FF5733", // Cor estática para Paul Davies
      },
      {
        name: "Lionel Messi",
        nick: "leomessi",
        email: "messi@gmail.com",
        password: "25d55ad283aa400af464c76d713c07ad", // 12345678
        avatar_url:
          "https://4kwallpapers.com/images/wallpapers/lionel-messi-soccer-4345x2896-9789.jpeg",
        cover_url:
          "https://images.livemint.com/img/2023/02/02/1600x900/France-Soccer-League-One-0_1675297246432_1675297246432_1675297277565_1675297277565.jpg",
        account_privacy: "public",
        account_verified: "public_figure",
        theme: "#3366FF", // Cor estática para Lionel Messi
      },
      {
        name: "Sean Karl",
        nick: "sean",
        email: "sean@gmail.com",
        password: "25d55ad283aa400af464c76d713c07ad", // 12345678
        avatar_url:
          "https://us.123rf.com/450wm/deagreez/deagreez2106/deagreez210605780/173026092-portrait-of-nice-serious-brunette-hairdo-guy-touch-spectacles-wear-orange-t-shirt-isolated-on-lilac.jpg?ver=6",
        cover_url:
          "https://us.123rf.com/450wm/vadymvdrobot/vadymvdrobot2010/vadymvdrobot201001191/158207524-image-of-funny-unsured-african-guy-isolated-over-grey-wall-background-in-eyeglasses.jpg?ver=6",
        account_privacy: "private",
        account_verified: "public_figure",
        theme: "#99CC00", // Cor estática para Sean Karl
      },
      {
        name: "Anna Fisher",
        nick: "anna",
        email: "anna@gmail.com",
        password: "25d55ad283aa400af464c76d713c07ad", // 12345678
        avatar_url:
          "https://us.123rf.com/450wm/deagreez/deagreez1903/deagreez190301372/119452123-close-up-side-profile-photo-beautiful-amazing-business-she-her-lady-just-started-career-resourceful.jpg?ver=6",
        cover_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv34GC8zDV262BkLzzh0E7IXa9qfO3Utz1mxOCECXF2onh9I3j7eCtRappiXisGyMazKI&usqp=CAU",
        account_privacy: "public",
        account_verified: "public_figure",
        theme: "#FF9900", // Cor estática para Anna Fisher
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
        theme: "#6633CC", // Cor estática para Trybe
      },
      {
        name: "Mary Ruby",
        nick: "mary",
        email: "mary@gmail.com",
        password: "25d55ad283aa400af464c76d713c07ad", // 12345678
        avatar_url:
          "https://us.123rf.com/450wm/luismolinero/luismolinero1905/luismolinero190505768/123597030-young-redhead-woman-with-sweatshirt-with-glasses-and-surprised.jpg?ver=6",
        cover_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZNhaC1h4vlrZf8Xd7fz26Q7CZCU0AspCSN3tc1NbdJDdXe4FsA9wlXHbadBuM_Qpho54&usqp=CAU",
        account_privacy: "public",
        account_verified: "public_figure",
        theme: "#CC3366", // Cor estática para Mary Ruby
      },
      {
        name: "Carol Smith",
        nick: "carol",
        email: "carol@gmail.com",
        password: "25d55ad283aa400af464c76d713c07ad", // 12345678
        avatar_url:
          "https://us.123rf.com/450wm/kegfire/kegfire1812/kegfire181200039/114680595-colorful-trendy-woman-pointing-up.jpg?ver=6",
        cover_url:
          "https://static.saltinourhair.com/wp-content/uploads/2019/03/23140717/best-travel-quotes-saltinourhair.jpg",
        account_privacy: "public",
        account_verified: "public_figure",
        theme: "#FFCC00", // Cor estática para Carol Smith
      },
      {
        name: "Teschio Messicano",
        nick: "teschio",
        email: "teschio@gmail.com",
        password: "25d55ad283aa400af464c76d713c07ad", // 12345678
        avatar_url:
          "https://us.123rf.com/450wm/vadymvdrobot/vadymvdrobot2109/vadymvdrobot210901345/174346545-young-white-man-with-earring-posing-and-looking-upward-isolated-over-orange-background.jpg?ver=6",
        cover_url: "https://images5.alphacoders.com/462/462361.jpg",
        account_privacy: "public",
        account_verified: "public_figure",
        theme: "#00CC99", // Cor estática para Teschio Messicano
      },
      {
        name: "Shein",
        nick: "shein",
        email: "shein@gmail.com",
        password: "25d55ad283aa400af464c76d713c07ad", // 12345678
        avatar_url: "https://bk.ibxk.com.br/2022/01/27/27144706197336.jpg",
        cover_url:
          "https://editalconcursosbrasil.com.br/wp-content/uploads/2022/05/shein.jpg",
        account_privacy: "public",
        account_verified: "company",
        theme: "#000000", // Cor estática para Shein
      },
      {
        name: "Alexandra Borke",
        nick: "alexandra",
        email: "alexandra@gmail.com",
        password: "25d55ad283aa400af464c76d713c07ad", // 12345678
        avatar_url:
          "https://us.123rf.com/450wm/deagreez/deagreez1912/deagreez191201657/135268682-photo-of-curly-wavy-brown-haired-woman-in-white-t-shirt-showing-you-shh-sign-to-stop-your-talking.jpg?ver=6",
        cover_url: "https://cdn.wallpapersafari.com/16/1/cl5zFj.jpg",
        account_privacy: "public",
        account_verified: "public_figure",
        theme: "#CC99FF", // Cor estática para Alexandra Borke
      },
      {
        name: "Helena Isabele",
        nick: "helena",
        email: "hisabelersilva@gmail.com",
        password: "25d55ad283aa400af464c76d713c07ad", // 12345678
        avatar_url: "https://i.ibb.co/xzJ10dc/cropped-h.jpg",
        cover_url: "https://i.ibb.co/3fXsK3z/rio.jpg",
        account_privacy: "public",
        account_verified: "identity",
        theme: "#33CC99", // Cor estática para Helena Isabele
      },
    ];

    await queryInterface.bulkInsert("users", users, { timestamps: false });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
