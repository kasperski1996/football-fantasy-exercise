const express = require('express');
const app = express();
const PORT = 8989;
const dal = require('./DAL');

// Routers
const playersCtrl = require('./controllers/player.ctrl');

app.use('/', express.static('public'));

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.use('/api/player', playersCtrl);

app.get('/api/team', function (req, res) {
    const teams = dal.read('team');
    res.send(teams);
})

app.listen(PORT, () => console.log(`server started at port ${PORT}`))