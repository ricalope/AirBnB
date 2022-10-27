'use strict';

module.exports = {
   async up(queryInterface, Sequelize) {
      /**
       * Add seed commands here.
       *
       * Example:
       * await queryInterface.bulkInsert('People', [{
       *   name: 'John Doe',
       *   isBetaMember: false
       * }], {});
      */
      await queryInterface.bulkInsert('ReviewImages', [
         {
            reviewId: 1,
            url: 'https://www.cachethomes.net/wp-content/uploads/Cachet-Homes-EH1-A-2.jpg'
         },
         {
            reviewId: 2,
            url: 'https://www.istockphoto.com/photo/corn-flag-paint-a-rustic-picture-in-rural-iowa-gm484404202-71237747?phrase=iowa%20corn%20field'
         },
         {
            reviewId: 3,
            url: 'https://p.bookcdn.com/data/Photos/r1609x607/9614/961432/961432744.JPEG'
         },
         {
            reviewId: 4,
            url: 'https://photos.zillowstatic.com/fp/dcc6a40b3ea8fd51f0e59953cec9e230-cc_ft_768.webp'
         },
         {
            reviewId: 5,
            url: 'https://a0.muscache.com/im/pictures/b8f2d441-771c-4c2a-80f1-0e7ce45c2a1c.jpg?im_w=1200'
         }
      ], {});
   },

   async down(queryInterface, Sequelize) {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
      await queryInterface.bulkDelete('ReviewImages', null, {});
   }
};