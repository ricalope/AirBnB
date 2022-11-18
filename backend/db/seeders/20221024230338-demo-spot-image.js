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
      await queryInterface.bulkInsert('SpotImages', [
         {
            spotId: 1,
            url: 'https://thetinylife.com/wp-content/uploads/2021/05/tiny-house-for-sale-scottsdale-arizona.jpg',
            preview: true
         },
         {
            spotId: 2,
            url: 'https://thetinylife.com/wp-content/uploads/2021/05/grand-canyon-tiny-house-for-rent.jpg',
            preview: true
         },
         {
            spotId: 3,
            url: 'https://thetinylife.com/wp-content/uploads/2021/05/glamping-aframe-for-rent-in-arizona.jpg',
            preview: true
         },
         {
            spotId: 4,
            url: 'https://a0.muscache.com/im/pictures/b8f2d441-771c-4c2a-80f1-0e7ce45c2a1c.jpg?im_w=1200',
            preview: true
         },
         {
            spotId: 5,
            url: 'https://www.familyhandyman.com/wp-content/uploads/2017/08/Wee-House-Arado-Courtesy-of-Alchemy-Architects.jpg?w=1200',
            preview: true
         },
         {
            spotId: 6,
            url: 'https://cdn.vox-cdn.com/thumbor/1NX3nvxqHyufNlgldf-8LsTq1_E=/0x0:1400x897/1820x1213/filters:focal(588x336:812x560):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/65893255/small_storage_xl.0.jpg',
            preview: true
         },
         {
            spotId: 7,
            url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tiny-homes-for-sale-1655402819.jpg?crop=1.00xw:0.752xh;0,0.0625xh&resize=980:*',
            preview: true
         },
         {
            spotId: 8,
            url: 'https://images.squarespace-cdn.com/content/v1/56763f974bf118c80a3428eb/d6fb11ad-9988-4180-9a72-e6f2af46d950/Lemon+Cove+RV+Park+.png?format=1000w',
            preview: true
         },
         {
            spotId: 9,
            url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tiny-houses-buy-1661975977.png?crop=1xw:0.9939593629873696xh;center,top&resize=980:*',
            preview: true
         },
         {
            spotId: 10,
            url: 'https://images.adsttc.com/media/images/5e79/5e8f/b357/65c4/5c00/0409/slideshow/_fi.jpg?1585012324',
            preview: true
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
      await queryInterface.bulkDelete('SpotImages', null, {});
   }
};
