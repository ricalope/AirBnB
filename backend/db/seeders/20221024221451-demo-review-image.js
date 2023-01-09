'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
   async up(queryInterface, Sequelize) {
      options.tableName = 'ReviewImages'
      await queryInterface.bulkInsert(options, [
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
      options.tableName = 'ReviewImages'
      await queryInterface.bulkDelete(options, null, {});
   }
};
