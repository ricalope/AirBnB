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
      await queryInterface.bulkInsert('Spots', [
         {
            ownerId: 1,
            address: '123 W chandler blvd',
            city: 'Chandler',
            state: 'Arizona',
            country: 'USA',
            lat: 12,
            lng: 34,
            name: 'the ev spot',
            description: 'nice relaxing view of the east valley',
            price: 500.99
         },
         {
            ownerId: 2,
            address: '345 N scottsdale rd',
            city: 'Scottsdale',
            state: 'Arizona',
            country: 'USA',
            lat: 789,
            lng: 10,
            name: 'wine moms and hootnannies',
            description: 'clubs and golf clubs',
            price: 1000.99
         },
         {
            ownerId: 2,
            address: '777 lucky slots rd',
            city: 'Las Vegas',
            state: 'Nevada',
            country: 'USA',
            lat: 92,
            lng: 100,
            name: 'what happens in vegas stays in vegas',
            description: 'close to the strip with lots of amenities',
            price: 1200.99
         },
         {
            ownerId: 3,
            address: '55 W funkytown st',
            city: 'Plainstown',
            state: 'Michigan',
            country: 'USA',
            lat: 33,
            lng: 12,
            name: 'there are things to do here',
            description: 'its cold and stuff',
            price: 100.99
         },
         {
            ownerId: 3,
            address: '444 N farming way',
            city: 'Boise',
            state: 'Iowa',
            country: 'USA',
            lat: 91,
            lng: 66,
            name: 'we got corn',
            description: 'if you like corn, and well, corn... we got plenty',
            price: 250.99
         }
      ], {})
   },

   async down(queryInterface, Sequelize) {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
      await queryInterface.bulkDelete('Spots', null, {});
   }
};
