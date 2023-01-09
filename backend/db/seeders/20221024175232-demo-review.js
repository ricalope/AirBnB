'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
   async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews'
      await queryInterface.bulkInsert(options, [
         {
            userId: 6,
            spotId: 2,
            review: "It was really like sunny, I did get a tan so that's a plus. They had the wine fridge stocked so we went a head and drank about 8 bottles. Great time, too hot.",
            stars: 4
         },
         {
            userId: 7,
            spotId: 5,
            review: "well i didnt have high expectations and the description was right... theres corn... everywhere",
            stars: 3
         },
         {
            userId: 8,
            spotId: 3,
            review: "What happens here stays here right, WRONG! The host called me in the middle of the night and told us we had to leave because of quote illegal activity unquote.",
            stars: 1
         },
         {
            userId: 9,
            spotId: 1,
            review: "I only stayed to visit family but the host was very accommodating, they made sure I knew where eveyrthing was and even some good reccomendations for food",
            stars: 5
         },
         {
            userId: 10,
            spotId: 4,
            review: "good lord why did i decide to come in december, i couldn't leave the house, it was so darn cold",
            stars: 3
         },
         {
            userId: 6,
            spotId: 6,
            review: "Wow the views here are really spectacular I wish I could have stayed longer, but I will definitely be coming back",
            stars: 5
         },
         {
            userId: 7,
            spotId: 7,
            review: "I was planning on giving this place 5 stars but overall my stay here was just ok, it was a bit fru fru for my tastes.",
            stars: 3
         },
         {
            userId: 8,
            spotId: 8,
            review: "I love New York, but man this place was kinda smelly. I'm planning on asking for at least a partial refund as we had to leave early and find a hotel.",
            stars: 1
         },
         {
            userId: 9,
            spotId: 9,
            review: "I wish I could have stayed longer the location was beautiful and the hosts were wonderful, I only had one complaint, the water for the shower was lukewarm at best.",
            stars: 4
         },
         {
            userId: 10,
            spotId: 10,
            review: "The hosts had some good recommendations about what to see, as there isnt a ton to do in tombstone but overall a good vacation.",
            stars: 3
         },
         {
            userId: 6,
            spotId: 1,
            review: "Beautiful home in a nice quiet neighborhood. We really enjoyed sitting around the fire pit every night and loved the big open kitchen to snack and cook and enjoy each other’s company.",
            stars: 4
         },
         {
            userId: 7,
            spotId: 2,
            review: "Clean house, it was the perfect staycation. It also was so close to everything so it was perfect for when we wanted to go out and do things outside the house!! Would definitely stay again!!",
            stars: 3
         },
         {
            userId: 8,
            spotId: 3,
            review: "Aesthetically at first sight the house is nice looking with open space. Location is great, close to stores and restaurants. The house seemed clean. House was well stocked for cooking and household items. The pool and backyard was welcoming and relaxing.",
            stars: 4
         },
         {
            userId: 9,
            spotId: 1,
            review: "We had a great stay here at your house. Our family vacation was amazing. 6 adults one baby. The house was very clean. The shallow end to the pool was perfect for my 11 month old grandson. The temp was great.",
            stars: 5
         },
         {
            userId: 10,
            spotId: 4,
            review: "Absolutely gorgeous home! We were so comfortable and had access to everything we needed. The pool was phenomenal! We paid to have it heated and it was worth every penny! Nothing beat sitting out back by the fire during the sunrise and sunset.",
            stars: 5
         }
      ], {});
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete(options, null, {});
   }
};
