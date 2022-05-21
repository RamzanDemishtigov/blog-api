const Post = require('../models').Post;
const User = require('../models').User;

module.exports = {
  getById(req, res) {
    return Post
      .findByPk(req.params.id)
      .then((post) => {
        if (!post) {
          return res.status(404).send({
            message: 'Post Not Found',
          });
        }
        return res.status(200).send(post);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  add(req, res) {
    const userId = req.user.id;
    return Post
      .create({
        user_id: userId,
        title: req.body.title,
        content: req.body.content
      })
      .then((post) => res.status(201).send(post))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Post
      .findByPk(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(404).send({
            message: 'Post Not Found',
          });
        }
        if (post.user_id !== req.user.id) {
          return res.status(403).send({
            message: 'User not authorized to update this post.'
          })
        }

        return post
          .update({
            title: req.body.title || post.title,
            content: req.body.content || post.content
          })
          .then(() => res.status(200).send(post))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Post
      .findByPk(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(400).send({
            message: 'Post Not Found',
          });
        }
        if (post.user_id !== req.user.id) {
          return res.status(403).send({
            message: 'User not authorized to delete this post.'
          })
        }

        return caption
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
