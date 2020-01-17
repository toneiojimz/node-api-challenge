const express = require('express');
const Actions = require('../data/helpers/actionModel.js')
const Projects= require('../data/helpers/projectModel.js')

const router = express.Router();


//GET action by id
router.get('/:id', (req, res) => {
   

    Actions.get(req.params.id)
  .then(action => {
      res.status(200).json(action);  
  })
  .catch(error => {
   
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving project'
    });
  });


});


//DELETE action by id

router.delete('/:id', (req, res) => {
    if (!req.body && !req.body.id) {
        return res.status(400).json({ error: "There is no action with that ID" })
    }

    Actions.remove(req.params.id)
  .then(response => {
      res.status(200).json({ message: 'The action has been erased' });
   
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error removing the action'
    });
  });
  });




//UPDATE action by id
router.put('/:id', (req, res) => {



    const actionInfo = {
        notes: req.body.name,
        description: req.body.description
        
    }

    Actions.update(req.params.id, actionInfo)
    .then(() => {
        Actions.get(req.params.id)
        .then(response => {
            return res.status(200).json(response);
        })
    })
  
});



module.exports = router;