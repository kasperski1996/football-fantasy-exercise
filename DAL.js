// Data access layer
const fs = require('fs');

function read(type) {
    switch (type) {
        case 'player':
            return JSON.parse(fs.readFileSync('./data/players.json', 'utf-8'));
        case 'team':
            return JSON.parse(fs.readFileSync('./data/teams.json', 'utf-8'));
    }
}

function readOne(type, id) {
    switch (type) {
        case 'player':
            return read(type).find(p => p.id == id);
        case 'team':
            return read(type).find(t => t.id == id);
    }
}

function update(type, id, entity) {
    switch (type) {
        case 'player':
            const players = read('player');
            const pIndex = players.findIndex(p => p.id == id);
            players[pIndex] = { ...players[pIndex], ...entity }
            fs.writeFileSync('./data/players.json', JSON.stringify(players));
            return players[pIndex];
        case 'team':
            return JSON.parse(fs.readFileSync('./data/teams.json', 'utf-8')).find(t => t.id === id);;
    }
}

function add(type, entity) {
    let file;
    switch (type) {
        case 'player':
            file = './data/players.json';
            break;
        case 'team':
            file = './data/teams.json';
            break;
    }

    const snap = JSON.parse(fs.readFileSync(file, 'utf-8'));
    snap.push(entity);
    fs.writeFileSync(file, JSON.stringify(snap));
    return true;
}


module.exports = {
    add,
    read,
    readOne,
    update
}