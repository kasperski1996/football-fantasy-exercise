const express = require('express');
const app = express();
const PORT = 8989;

// Routers
const playersCtrl = require('./controllers/player.ctrl');
const teamCtrl = require('./controllers/team.ctrl');
const userCtrl = require('./controllers/users.ctrl');

app.use('/', express.static('public'));

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.use('/api/player', playersCtrl);
app.use('/api/team', teamCtrl);
app.use('/api/user', userCtrl);


app.listen(PORT, () => console.log(`server started at port ${PORT}`))