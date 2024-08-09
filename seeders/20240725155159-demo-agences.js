module.exports = {
  up: async (queryInterface, Sequelize) => {
    const agences = Array.from({ length: 100 }, (_, index) => ({
      Localisation: `Localisation ${index + 1}`,
      email: `example${index + 1}@domain.com`,
      password: `password${index + 1}`,
      idAdmin: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Agences', agences);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Agences', null, {});
  }
};
