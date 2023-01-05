'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Utilisateurs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      telephone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      adresse: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
      agenceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Agences',
          key: 'id',
        },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Utilisateurs');
  }
};