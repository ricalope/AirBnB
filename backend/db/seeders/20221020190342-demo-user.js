'use strict';

const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
   up: async (queryInterface, Sequelize) => {
      options.tableName = 'Users'
      return queryInterface.bulkInsert(options, [
         {
            email: 'demo@user.io',
            username: 'Demo-lition',
            firstName: 'John',
            lastName: 'Hodges',
            hashedPassword: bcrypt.hashSync('password')
         },
         {
            email: 'user1@user.io',
            username: 'FakeUser1',
            firstName: 'Dan',
            lastName: 'Gilman',
            hashedPassword: bcrypt.hashSync('password2')
         },
         {
            email: 'user2@user.io',
            username: 'FakeUser2',
            firstName: 'Yasha',
            lastName: 'Kang',
            hashedPassword: bcrypt.hashSync('password3')
         },
         {
            email: 'user3@user.io',
            username: 'FakeUser3',
            firstName: 'Tom',
            lastName: 'Gallard',
            hashedPassword: bcrypt.hashSync('password3')
         },
         {
            email: 'user4@user.io',
            username: 'FakeUser4',
            firstName: 'Sherry',
            lastName: 'Bobbins',
            hashedPassword: bcrypt.hashSync('password3')
         },
         {
            email: 'user5@user.io',
            username: 'FakeUser5',
            firstName: 'Maria',
            lastName: 'Cervantes',
            hashedPassword: bcrypt.hashSync('password')
         },
         {
            email: 'user6@user.io',
            username: 'FakeUser6',
            firstName: 'Rose',
            lastName: 'McGinnes',
            hashedPassword: bcrypt.hashSync('password2')
         },
         {
            email: 'user7@user.io',
            username: 'FakeUser7',
            firstName: 'Ariana',
            lastName: 'Megally',
            hashedPassword: bcrypt.hashSync('password3')
         },
         {
            email: 'user8@user.io',
            username: 'FakeUser8',
            firstName: 'Bailey',
            lastName: 'Jones',
            hashedPassword: bcrypt.hashSync('password3')
         },
         {
            email: 'user9@user.io',
            username: 'FakeUser9',
            firstName: 'Kyle',
            lastName: 'Sorenson',
            hashedPassword: bcrypt.hashSync('password3')
         }
      ], {});
   },

   down: async (queryInterface, Sequelize) => {
      options.tableName = 'Users'
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
         username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
      }, {});
   }
};
