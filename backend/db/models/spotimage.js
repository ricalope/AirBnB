'use strict';

const {
   Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class SpotImage extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId' });
      }
   }
   SpotImage.init({
      spotId: DataTypes.INTEGER,
      url: DataTypes.STRING,
      preview: DataTypes.BOOLEAN
   }, {
      sequelize,
      modelName: 'SpotImage',
      defaultScope: {
         attributes: {
            exclude: ['createdAt', 'updatedAt']
         }
      },
      hooks: {
         afterCreate: (record) => {
            delete record.dataValues.spotId
            delete record.dataValues.createdAt
            delete record.dataValues.updatedAt
         },
         afterUpdate: (record) => {
            delete record.dataValues.spotId
            delete record.dataValues.createdAt
            delete record.dataValues.updatedAt
         }
      }
   });
   return SpotImage;
};
