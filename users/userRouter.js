const express = require('express');

const router = express.Router();

const Users = require('./userDb')

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: "error creating new user on server" })
    })
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then(users => {
      if (users.length) {
        res.status(200).json(users)
      }
      else {
        res.status(404).json({ message: "no users found" })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "error getting users from the server" })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  //return the user object that was added to the request by the validateUserId middleware
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.user.id)
    .then(posts => {
      if (posts.length) {
        res.status(200).json(posts)
      }
      else {
        res.status(404).json({ message: `no posts found for ${user}` })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving the posts from the server" })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.user.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json(req.user)
      }
      else {
        res.status(500).json({ message: "user was not removed from the database" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "user was not removed from the database" })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params
  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      }
      else {
        res.status(400).json({ message: "invalid user id" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error finding user by id on the server" })
    })
}

function validateUser(req, res, next) {
  // do your magic!
  if (req.body['name']) {
    next()
  }
  else if (req.body) {
    res.status(400).json({ message: "missing required name field" })
  }
  else {
    res.status(400).json({ message: "missing user data" })
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
