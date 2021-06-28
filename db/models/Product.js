const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: { type: DataTypes.STRING, allowNull: false },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        min: 1,
      },
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: DataTypes.STRING,
    description: DataTypes.STRING,
  });
  SequelizeSlugify.slugifyModel(Product, { source: ["name"] });

  Product.associate = (models) => {
    models.Shop.hasMany(Product, {
      foreignKey: "shopId",
      as: "products",
    });
    Product.belongsTo(models.Shop, {
      foreignKey: "shopId",
    });
  };

  return Product;
};
