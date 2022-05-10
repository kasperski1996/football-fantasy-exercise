const htmlUtils = {
    teamObjectToOptionElementMapper: (team, selectedTeam) => {
        const optionElement = document.createElement('option');
        optionElement.value = team.id;
        optionElement.appendChild(document.createTextNode(team.name));
        if (selectedTeam && team.name == selectedTeam) {
            optionElement.selected = true
        }
        return optionElement;
    },
    playerObjectToRowElementMapper: player => {
        const rowElement = document.createElement('tr');
        Object.entries(player).forEach(kv => {
            const td = document.createElement('td');
            const span = document.createElement('span');

            span.appendChild(document.createTextNode(
                kv[0] == 'teamid' ?
                    app.data.teams.find(t => t.id == kv[1]).name :
                    kv[1])
            )
            td.dataset.field = kv[0];
            td.appendChild(span);
            rowElement.appendChild(td);
        });

        const operationsTd = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-primary px-3 mx-2';
        editBtn.appendChild(document.createTextNode('Edit'));
        editBtn.addEventListener('click', app.listeners.editPlayerBtn);
        operationsTd.appendChild(editBtn);

        const saveBtn = document.createElement('button');
        saveBtn.className = 'd-none btn btn-primary px-3 mx-2';
        saveBtn.appendChild(document.createTextNode('Save'));
        operationsTd.appendChild(saveBtn);
        saveBtn.addEventListener('click', app.listeners.savePlayerBtn);
        rowElement.appendChild(operationsTd);
        return rowElement;
    }
}

const API_ENDPOINTS = {
    Player: '/api/player',
    PlayerPositions: '/api/player/position'
}

const app = {
    elements: {
        addPlayerForm: document.forms[0],
        playersTable: document.getElementById('players-list')
    },
    data: {
        teams: [],
        players: [],
        playerPositions: []
    },
    listeners: {
        addPlayerBtn: function (e) {
            e.preventDefault();
            const formToObj = Object.values(e.target).map(inp => ({ name: inp.name, value: inp.value })).filter(o => o.name);

            fetch(API_ENDPOINTS.Player, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formToObj.map(o => encodeURIComponent(o.name) + '=' + encodeURIComponent(o.value)).join('&')
            });
        },
        editPlayerBtn: function (e) {
            /**
             * @type {HTMLButtonElement}
             */
            const target = e.target;
            Array.from(target.parentElement.querySelectorAll('button')).find(b => b != target).classList.remove('d-none');
            target.classList.add('d-none');


            target.parentElement.parentElement
                .querySelectorAll('td[data-field="teamid"] span').forEach(e => {
                    const select = document.createElement('select');
                    app.data.teams
                        .map(team => select.appendChild(htmlUtils.teamObjectToOptionElementMapper(team, e.innerText)));

                    e.parentNode.replaceChild(select, e);
                });

            target.parentElement.parentElement
                .querySelectorAll('td[data-field="position"] span').forEach(e => {
                    const select = document.createElement('select');
                    app.data.playerPositions
                        .map(playerPosition => {
                            const option = document.createElement('option');
                            option.value = playerPosition;
                            option.appendChild(document.createTextNode(playerPosition))
                            if (e.innerText == playerPosition) {
                                option.selected = true;
                            }
                            select.appendChild(option);
                        });

                    e.parentNode.replaceChild(select, e);
                });


            target.parentElement.parentElement
                .querySelectorAll('td[data-field="name"] span').forEach(e => {
                    const inp = document.createElement('input');
                    inp.value = e.innerText;
                    e.parentNode.replaceChild(inp, e);
                });

        },
        savePlayerBtn: function (e) {
            /**
             * @type {HTMLButtonElement}
            */
            const target = e.target;

            let editedObj = {};


            target.parentElement.parentElement
                .querySelectorAll('td[data-field] input').forEach(e => {
                    const span = document.createElement('span');
                    span.innerText = e.value;
                    e.parentNode.replaceChild(span, e);
                });

            target.parentElement.parentElement
                .querySelectorAll('td[data-field="teamid"] select').forEach(e => {
                    editedObj.teamid = e.value;
                    const span = document.createElement('span');
                    span.innerText = app.data.teams.find(t => t.id == e.value).name;
                    e.parentNode.replaceChild(span, e);
                });
            target.parentElement.parentElement
                .querySelectorAll('td[data-field="position"] select').forEach(e => {
                    const span = document.createElement('span');
                    span.innerText = e.value;
                    e.parentNode.replaceChild(span, e);
                });
            target.parentElement.parentElement
                .querySelectorAll('td[data-field]:not([data-field="teamid"])').forEach(i => editedObj[i.dataset.field] = i.innerText);

            Array.from(target.parentElement.querySelectorAll('button')).find(b => b != target).classList.remove('d-none');
            target.classList.add('d-none');

            fetch(API_ENDPOINTS.Player + '/' + editedObj.id, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(editedObj)
            });
        }
    }
}

fetch('/api/team')
    .then(res => res.json())
    .then(res => app.data.teams = res)
    .then(() => fetch(API_ENDPOINTS.Player))
    .then(res => res.json())
    .then(res => app.data.players = res)
    .then(res => fetch(API_ENDPOINTS.PlayerPositions))
    .then(res => res.json())
    .then(res => app.data.playerPositions = res)
    .then(main);


function main() {
    app.data.teams.map(team => app.elements.addPlayerForm['player-team'].appendChild(htmlUtils.teamObjectToOptionElementMapper(team)));
    app.data.playerPositions.forEach(playerPosition => {
        const option = document.createElement('option');
        option.value = playerPosition;
        option.appendChild(document.createTextNode(playerPosition));
        app.elements.addPlayerForm['player-position'].appendChild(option);
    });

    app.data.players.map(player => app.elements.playersTable.appendChild(htmlUtils.playerObjectToRowElementMapper(player)));

    app.elements.addPlayerForm.addEventListener('submit', app.listeners.addPlayerBtn);
}