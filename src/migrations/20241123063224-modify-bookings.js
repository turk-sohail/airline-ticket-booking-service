"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    queryInterface.addColumn("Bookings", "noOfSeats", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
    queryInterface.addColumn("Bookings", "totalCost", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn("Bookings", "noOfSeats");
    queryInterface.removeColumn("Bookings", "totalCost");
  },
};
