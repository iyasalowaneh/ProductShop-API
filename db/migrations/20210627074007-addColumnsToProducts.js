"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "name", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Products", "price", {
      type: Sequelize.INTEGER,
      defaultValue: 5,
      validate: {
        min: 1,
      },
    });

    await queryInterface.addColumn("Products", "slug", {
      type: Sequelize.STRING,
      unique: true,
    });
    await queryInterface.addColumn("Products", "image", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Products", "description", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "name");
    await queryInterface.removeColumn("Products", "price");
    await queryInterface.removeColumn("Products", "slug");
    await queryInterface.removeColumn("Products", "image");
    await queryInterface.removeColumn("Products", "description");
  },
};
