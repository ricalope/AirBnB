'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
   async up(queryInterface, Sequelize) {
      options.tableName = 'Spots'
      await queryInterface.bulkInsert(options, [
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
            ownerId: 3,
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
            ownerId: 4,
            address: '55 W funkytown st',
            city: 'Plainstown',
            state: 'Michigan',
            country: 'USA',
            lat: 33,
            lng: 12,
            name: 'there are things to do here',
            description: 'Honestly, its just a shack theres not much to do around here but its cold, real cold.',
            price: 100.99
         },
         {
            ownerId: 5,
            address: '444 N farming way',
            city: 'Des Moines',
            state: 'Iowa',
            country: 'USA',
            lat: 91,
            lng: 66,
            name: 'we got corn',
            description: 'if you like corn, and well, corn... we got plenty',
            price: 250.99
         },
         {
            ownerId: 1,
            address: '4521 S Front St.',
            city: 'Stanwood',
            state: 'Washington',
            country: 'USA',
            lat: 12,
            lng: 34,
            name: 'The Cozy Cottage',
            description: 'This hub has a beautiful view of the nearby mountains, where you can escape the crowds. Cozy up to the wood fireplace, and enjoy the local wine.',
            price: 200.99
         },
         {
            ownerId: 2,
            address: '8357 SE Montelisa Rd',
            city: 'Montecito',
            state: 'California',
            country: 'USA',
            lat: 789,
            lng: 10,
            name: 'Le Petit Chateau',
            description: 'Come visit this tiny castle in the clouds and spend your days taking in the ocean breeze. This hub is the ultimate relaxtion spot.',
            price: 1000.99
         },
         {
            ownerId: 3,
            address: '73112 N Manhattan St',
            city: 'New York',
            state: 'New York',
            country: 'USA',
            lat: 92,
            lng: 100,
            name: 'Tiny Big Apple',
            description: 'Imagine staying in the only Tiny Big Apple in America. Overlooking Central Park from a apple shaped tiny home hoisted in the sky.',
            price: 1200.99
         },
         {
            ownerId: 4,
            address: '84724 NW Menagerie Coast Dr',
            city: 'Nantucket',
            state: 'Massachusetts',
            country: 'USA',
            lat: 33,
            lng: 12,
            name: 'Pirates Hideaway',
            description: 'This tiny hub is a refurbished pirate ship from the 1880s and was once captained by Jerermiah T Jones. If youre looking for adventure, this is the hub for you.',
            price: 1500.99
         },
         {
            ownerId: 5,
            address: '6365 S Choo Choo Way',
            city: 'Tombstone',
            state: 'Arizona',
            country: 'USA',
            lat: 91,
            lng: 66,
            name: 'Pew Pew Bang Bang Car',
            description: 'Come stay in a train car conversion where the famous Gunfight at the O.K. Corralocurred. See daily reenactments of the infomous fight, and interact with the actors.',
            price: 250.99
         }
      ], {})
   },

   async down(queryInterface, Sequelize) {
      options.tableName = 'Spots'
      await queryInterface.bulkDelete(options, null, {});
   }
};
