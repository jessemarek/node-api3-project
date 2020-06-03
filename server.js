const express = require('express');
const server = express();

const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) { }

server.use(express.json())

module.exports = server;
