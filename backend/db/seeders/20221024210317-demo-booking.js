'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
   async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings'
      await queryInterface.bulkInsert(options, [
         {
            userId: 1,
            spotId: 2,
            startDate: new Date('November 06, 2022'),
            endDate: new Date('November 10, 2022')
         },
         {
            userId: 2,
            spotId: 4,
            startDate: new Date('November 20, 2022'),
            endDate: new Date('November 30, 2022')
         },
         {
            userId: 3,
            spotId: 3,
            startDate: new Date('January 10, 2023'),
            endDate: new Date('January 12, 2023')
         }
      ], {});
   },

   async down(queryInterface, Sequelize) {
      options.tableName = 'Bookings'
      await queryInterface.bulkDelete(options, null, {});
   }
};
