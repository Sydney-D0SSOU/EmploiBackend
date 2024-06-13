'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Recruteurs', {
      idE: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      sujet: {
        type: Sequelize.STRING
      },
      localisation: {
        type: Sequelize.STRING
      },
      Detail: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Recruteurs');
  }
};
