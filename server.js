const express = require('express');


const projectRouter = require('./projects/projectRouter.js')

const server = express();

server.use(express.json());



server.get('/', (req, res) => {
  res.send(`
  <h1>Welcome to Projects API</h1>  
  `);
});


server.use('/api/projects', projectRouter);



module.exports = server;