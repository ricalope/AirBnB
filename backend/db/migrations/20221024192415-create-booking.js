'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Bookings', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'Users' },
            onDelete: 'CASCADE'
         },
         spotId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'Spots' },
            onDelete: 'CASCADE'
         },
         startDate: {
            type: Sequelize.DATE,
            allowNull: false
         },
         endDate: {
            type: Sequelize.DATE,
            allowNull: false
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
         }
      }, options);
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('Bookings', options);
   }
};
