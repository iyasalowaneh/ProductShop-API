"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Shops", "userId", Sequelize.INTEGER, {
      allowNull: false,
      references: {
        model: {
          tableName: "Users",
        },
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Shops", "userId");
  },
};
