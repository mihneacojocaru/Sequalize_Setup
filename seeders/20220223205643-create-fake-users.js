"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid: "5bc28c74-1776-4de0-a5d1-49f83f39fea9",
          name: "John Doe",
          email: "john.doe@email.com",
          role: "user"
        },
        {
          uuid: "5bc28c74-1991-4de0-a5d1-49f83f39tea1",
          name: "Gerol Steiner",
          email: "gerol.steiner@email.com",
          role: "admin"
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
