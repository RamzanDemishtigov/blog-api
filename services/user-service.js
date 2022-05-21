const User = require('../models').User;
const Post = require('../models').Post;

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  list(req, res) {
    return User
      .findAll({
        order: [
          ['id', 'ASC'],
        ],
        attributes: ['id', 'name']
      })
      .then((users) => res.status(200).send(users))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return User
      .findByPk(req.params.id, {
        include: [{
          model: Post,
          as: 'posts'
        }],
        attributes: ['id', 'name']
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  create(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      return User
        .create({
          name: req.body.name,
          password: hash
        })
      .then((user) => res.status(201).send({
        id: user.id,
        name: user.name,
      }))
      .catch((error) => res.status(400).send(error));
    })
  },

  login(req, res) {
    const user = User
      .findOne({
        where: {
          name: req.body.name
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Incorrect username or password'
          });
        }

        bcrypt.compare(req.body.password, user.password, function (err, result) {
          if (result) {
            const token = user.generateToken();
            return res.header("authorization", token).status(200).send({
              id: user.id,
              name: user.name,
              token: token
            });
          } else {
            return res.status(401).send({
              message: 'Incorrect username or password'
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  update(req, res) {
    if (req.user.id.toString() !== req.params.id) {
      return res.status(403).send({
        message: 'Unauthorized to update this user.'
      });
    }

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      return User
        .findByPk(req.params.id)
        .then(user => {
          if (!user) {
            return res.status(404).send({
              message: 'User Not Found',
            });
          }
          return user
            .update({
              name: req.body.name || user.name,
              password: req.body.hash || user.password
            })
            .then(() => res.status(200).send({
              id: user.id,
              name: user.name,
            }))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    });
  },
};
