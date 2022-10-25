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
      await queryInterface.bulkInsert('Reviews', [
         {
            userId: 1,
            spotId: 2,
            review: "I've been here many times and its always a blast",
            stars: 4
         },
         {
            userId: 2,
            spotId: 5,
            review: "well i didnt have high expectations and the description was right... theres corn... everywhere",
            stars: 3
         },
         {
            userId: 3,
            spotId: 3,
            review: "I mean its vegas what more could you ask for",
            stars: 4
         },
         {
            userId: 1,
            spotId: 1,
            review: "I only stayed to visit family but the hosts were very accommodating",
            stars: 5
         },
         {
            userId: 3,
            spotId: 4,
            review: "good lord why did i decide to come in december, i couldn't leave the house",
            stars: 3
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
      await queryInterface.bulkDelete('Reviews', null, {});
   }
};
