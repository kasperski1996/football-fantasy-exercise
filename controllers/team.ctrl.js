const express = require('express');
const dal = require('./../DAL');

const router = express.Router();

// http://localhost:8989/api/team
router.get('/', function (req, res) {
    const teams = dal.read('team');
    res.send(teams);
});

// http://localhost:8989/api/team/1
router.get('/:id', function (req, res) {
    const team = dal.readOne('team', req.params.id);
    res.send(team);
});

module.exports = router;