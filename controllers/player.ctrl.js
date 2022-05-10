const express = require('express');
const uuidv4 = require('uuid').v4;
const typedefs = require('./../typedefs');
const dal = require('./../DAL');

const playersCtrl = express.Router();

playersCtrl.post('/', function (req, res) {

    /** @type {typedefs.FootballPlayer} */
    const player = {
        id: uuidv4(),
        name: req.body['player-name'],
        position: req.body['player-position'],
        teamid: req.body['player-team'],
    }

    dal.add('player', player);
    res.send(player);
})

playersCtrl.get('/', function (req, res) {
    const players = dal.read('player');
    res.send(players);
})

playersCtrl.get('/position', function (req, res) {
    res.send(["Forward",
        "Midfielder",
        "Defender",
        "Goalkeeper"]);
})

playersCtrl.get('/:id', function (req, res) {
    const player = dal.readOne('player', req.params.id);
    res.send(player);
})

playersCtrl.put('/:id', function (req, res) {
    const player = dal.update('player', req.params.id, req.body);
    res.send(player);
})
module.exports = playersCtrl;