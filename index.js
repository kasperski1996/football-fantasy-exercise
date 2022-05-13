const express = require('express');
const app = express();
const PORT = 8989;
const dal = require('./DAL');

// Routers
const playersCtrl = require('./controllers/player.ctrl');
const teamCtrl = require('./controllers/team.ctrl');

app.use('/', express.static('public'));

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.use('/api/player', playersCtrl);
app.use('/api/team', teamCtrl);


app.listen(PORT, () => console.log(`server started at port ${PORT}`))