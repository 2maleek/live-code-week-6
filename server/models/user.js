'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const { hash } = require('../helpers/bcrypt')

  class User extends Model {
  }

  User.init({
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  },
  { hooks: {
    beforeSave(user, options) {
      return hash(user.password)
      .then(result => {
        user.password = result
      })
    }
  },sequelize })

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};