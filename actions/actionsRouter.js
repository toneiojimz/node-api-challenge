const express = require('express');
const actions = require('../data/helpers/actionModel.js')
const projects= require('../data/helpers/projectModel.js')

const router = express.Router();


//GET action by id
router.get('/:id', (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ error: "action id not found" });
    }
    actions.get(req.params.id)
    .then(response => {
        const project_id = response.project_id;
        projects.get(project_id)
        .then(resp => {
            return res.status(200).json(resp.actions);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: " actions not" })
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong." })
    })
});


//DELETE action by id

router.delete('/:id', (req, res) => {

    if (!req.body && !req.body.id) {
        return res.status(400).json({ error: "There is no action with that id" })
    }

    actions.remove(req.params.id)
    .then(response => {
        return res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "action not deleted" })
    })
  });




//UPDATE action by id
router.put('/:id', (req, res) => {

    if (!req.body.notes && !req.body.description) {
        return res.status(400).json({ error: "description and notes are required." })
    }

    const actionInfo = {
        notes: req.body.name,
        description: req.body.description,
        completed: req.body.completed || 0
    }

    actions.update(req.params.id, actionInfo)
    .then(() => {
        actions.get(req.params.id)
        .then(response => {
            return res.status(200).json(response);
        })
    })
  
});



module.exports = router;