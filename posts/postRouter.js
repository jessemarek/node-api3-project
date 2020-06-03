const express = require('express');

const router = express.Router();

const Posts = require('./postDb')

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
    .then(posts => {
      if (posts.length) {
        res.status(200).json(posts)
      }
      else {
        res.status(404).json({ message: "no posts found" })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "error getting posts from the server" })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  next()
}

module.exports = router;
