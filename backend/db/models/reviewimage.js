'use strict';

const {
   Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class ReviewImage extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         ReviewImage.belongsTo(models.Review, { foreignKey: 'reviewId' });
      }
   }
   ReviewImage.init({
      reviewId: DataTypes.INTEGER,
      url: DataTypes.STRING
   }, {
      sequelize,
      modelName: 'ReviewImage',
      hooks: {
         afterCreate: (record) => {
            delete record.dataValues.reviewId
            delete record.dataValues.createdAt
            delete record.dataValues.updatedAt
         },
         afterUpdate: (record) => {
            delete record.dataValues.reviewId
            delete record.dataValues.createdAt
            delete record.dataValues.updatedAt
         }
      }
   });
   return ReviewImage;
};
