'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      entree: {
        type: Sequelize.DATE,
        allowNull: false
      },
      sortie: {
        type: Sequelize.DATE,
        allowNull: false
      },
      statut: {
        type: Sequelize.STRING,
        allowNull: false
      },
      utilisateurId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Utilisateurs',
          key: 'id',
        },
      },
      appartementId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Appartements',
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
    await queryInterface.dropTable('Reservations');
  }
};