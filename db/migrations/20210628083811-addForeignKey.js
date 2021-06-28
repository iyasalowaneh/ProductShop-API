"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "shopId", Sequelize.INTEGER, {
      allowNull: false,
      references: {
        model: {
          tableName: "Shops",
        },
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "shopId");
  },
};
