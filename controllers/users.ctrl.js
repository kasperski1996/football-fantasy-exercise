
const express = require('express')
const dal = require('./../DAL')
const usersCtrl  = express.Router();
const uuidv4 = require('uuid').v4;


usersCtrl.post('/', function (req, res) {
    const user = {
        id: uuidv4(),
        first: req.body['first'],
        last: req.body['last'],
        email: req.body['email'],
        password: req.body['password'],
        playerId :[]

    }

    dal.add('user', user);
    res.send(user);
})

usersCtrl.get('/', function (req, res) {
    const user = dal.read('user');
    res.send(user);
})

usersCtrl.get('/:id', function (req, res) {
    const user = dal.readOne('user', req.params.id);
    res.send(user);
})


module.exports = usersCtrl;