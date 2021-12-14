'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
    }
  };
  Task.init({
    name: DataTypes.STRING,
    done: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};