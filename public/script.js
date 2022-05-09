const htmlUtils = {
   teamObjectToOptionElementMapper: team => {
      const optionElement = document.createElement('option');
      optionElement.value = team.id;
      optionElement.appendChild(document.createTextNode(team.name));
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
   Player: '/player'
}
const app = {
   elements: {
      addPlayerForm: document.forms[0],
      playersTable: document.getElementById('players-list')
   },
   data: {
      teams: [],
      players: []
   },
   listeners: {
      addPlayerBtn: function (e) {
         e.preventDefault();
         console.log(e.target);
         fetch(API_ENDPOINTS.Player, {
            method: 'POST',
            body: new FormData(e.target)
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
            .querySelectorAll('td[data-field] span').forEach(e => {
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

         target.parentElement.parentElement
            .querySelectorAll('td[data-field] input').forEach(e => {
               const span = document.createElement('span');
               span.innerText = e.value;
               e.parentNode.replaceChild(span, e);
            });

         let editedObj = {};
         target.parentElement.parentElement
            .querySelectorAll('td[data-field]').forEach(i => editedObj[i.dataset.field] = i.innerText);

         Array.from(target.parentElement.querySelectorAll('button')).find(b => b != target).classList.remove('d-none');
         target.classList.add('d-none');

         fetch(API_ENDPOINTS.Player, {
            method: 'PUT',
            headers: {
               'Content-type': 'application/json'
            },
            body: JSON.stringify(editedObj)
         });
      }
   }
}

fetch('/team')
   .then(res => res.json())
   .then(res => app.data.teams = res)
   .then(() => fetch(API_ENDPOINTS.Player))
   .then(res => res.json())
   .then(res => app.data.players = res)
   .then(main);


function main() {
   app.data.teams.map(team => app.elements.addPlayerForm['player-team'].appendChild(htmlUtils.teamObjectToOptionElementMapper(team)));
   app.data.players.map(player => app.elements.playersTable.appendChild(htmlUtils.playerObjectToRowElementMapper(player)));

   app.elements.addPlayerForm.addEventListener('submit', app.listeners.addPlayerBtn);
}