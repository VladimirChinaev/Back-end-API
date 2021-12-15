'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      done: {
        type: Sequelize.STRING,
        defaultValue: false,
        allowNull: false,
      },
      createdAtt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAtt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      // userId: {
      //   type: Sequelize.INTEGER,
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Users',
      //     key: 'id',
      //     as: 'userId',
      //   }
      // },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tasks');
  }
};