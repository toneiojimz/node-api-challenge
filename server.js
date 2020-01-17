const express = require('express');
const server = express();


const projectRouter = require('./projects/projectRouter.js')
const actionsRouter= require('./actions/actionsRouter.js')



server.use(express.json());





server.get('/', (req, res) => {
  res.send(`
  <h1>Welcome to Projects API</h1>  
  `);
});


server.use('/api/projects', projectRouter);
server.use('/api/actions', actionsRouter);



module.exports = server;