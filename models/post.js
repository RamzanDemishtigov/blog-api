'use strict';

/**
 * @swagger
 *  components:
 *    schemas:
 *      Post:
 *        type: object
 *        required:
 *          - user_id
 *          - title
 *          - content
 *        properties:
 *          user_id:
 *            type: integer
 *            description: fk of the user who created the post
 *          title:
 *            type: string
 *            description: title of the post
 *          content:
 *            type: text
 *            description: content of the post
 *        example:
 *           user_id: 2
 *           title: My first post!
 *           content: Hello, this is my first post on this blog.
 */
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  Post.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
