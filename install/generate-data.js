const fs = require('fs');
const os = require('os');
const path = require('path');
const typedefs = require('../typedefs');

const dataDir = path.join(__dirname, '..', 'data');

const d = fs.readFileSync(path.join(__dirname, './a.txt'), 'utf-8');
const d1 = d.split(os.EOL);
const teams = JSON.parse(fs.readFileSync(path.join(dataDir, 'teams.json'), 'utf-8'));

/** @type {typedefs.FootballPlayer[]} */
const pArr = [];

d1.forEach((l, i) => pArr.push({
   id: i + 1,
   name: l.trim(),
   position: Object.values(typedefs.PlayerPositionsEnum)[Math.floor(Math.random() * Object.values(typedefs.PlayerPositionsEnum).length)],
   teamid: Math.floor(Math.random() * teams.length) + 1
}));

fs.writeFileSync(path.join(dataDir, 'players.json'), JSON.stringify(pArr));