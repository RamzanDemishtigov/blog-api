'use strict';
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const jwt = require('jsonwebtoken');

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - password
 *        properties:
 *          name:
 *            type: string
 *          password:
 *            type: string
 *            description: Must be between 8 and 20 characters
 *        example:
 *           name: Test User
 *           password: p@ssw0rd
 */
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'user_id',
        as: 'posts'
      })
    }

    generateToken() {
      return jwt.sign({
          id: this.id,
        },
        config.privateKey);
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      len: [8,20]
    }
  }, {
    sequelize,
    modelName: 'User'
  });

  return User;
};
