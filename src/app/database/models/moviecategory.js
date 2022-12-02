const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieCategory extends Model {
    static associate(models) {
      MovieCategory.hasMany(models.Movie, {
        foreignKey: 'category_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      models.Movie.belongsTo(models.MovieCategory, {
        foreignKey: {
          name: 'category_id'
        },
        as: 'category'
      });
    }
  }
  MovieCategory.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'MovieCategory',
    tableName: 'movie_categories',
    timestamps: true
  });
  return MovieCategory;
};