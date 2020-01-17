const express = require('express');

const Projects = require('../data/helpers/projectModel.js')
const Actions = require('../data/helpers/actionModel.js')
const router = express.Router();


//POST a project to the Projects
router.post('/', (req, res) => {
  
  Projects.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the user',
    });
  });
});


//POST an action to project by id
router.post('/:id/actions', (req, res) => {
  
  const actionInfo = { ...req.body, project_id:req.params.id}
  
  Actions.insert(actionInfo)
  .then(response => {
    res.status(201).json(response)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: 'Action not added' });
  })
});


//GET all the Projects
router.get('/', (req, res) => {
  
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving Projects'
      });
    });
});

//GET project by id 
router.get('/:id', (req, res) => {
 
  Projects.get(req.params.id)
  .then(user => {
      res.status(200).json(user);  
  })
  .catch(error => {
   
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving user'
    });
  });
});


//GET Actions by Project id
router.get('/:id/actions', (req, res) => {
  
  Projects.getProjectActions(req.params.id)
  .then(actions => {
    res.status(200).json(actions);
  })
  .catch (error => {
    console.log(error);
    res.status(500).json({
      message: 'Error getting the Actions for the project'
    });
  });
});


//DELETE project by id
router.delete('/:id', (req, res) => {

  Projects.remove(req.params.id)
  .then(count => {
      res.status(200).json({ message: 'The project has been erased' });
   
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error removing the project'
    });
  });
});

//PUT update to project by id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  Projects.update(id, {name: name, description:description})
  .then(() => {
    return res.status(200).json({ message: "User Updated"});
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({ error: "User not updated" });
  })
});



module.exports = router;