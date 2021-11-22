"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     *
     */

    await queryInterface.bulkInsert("Tasks", [
      {
        description: "Aula Toti NodeJS 01",
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Aula Neon NodeJS",
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Aula Javascript 10",
        done: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Aula HTML 10",
        done: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Aula Css 12",
        done: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
