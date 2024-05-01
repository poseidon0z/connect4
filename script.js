const board = document.getElementById('board');
const state = [];
const coltops = [5, 5, 5, 5, 5, 5];
var player = 1;

for (let i = 0; i < 6; i++) {
  const row = [];

  for (let j = 0; j < 6; j++) {
    row.push(0);
  }
  state.push(row);
}

for (let i = 0; i < 6; i++) {
  const column = document.createElement('div');
  column.classList.add('column');

  for (let j = 0; j < 6; j++) {
    const box = document.createElement('div');
    box.id = j * 6 + i;
    box.classList.add('box');
    box.addEventListener('click', boxClicked);
    column.appendChild(box);
  }

  board.appendChild(column);
}

function boxClicked(event) {
  const col = event.target.id % 6;
  const fillbox = coltops[col] * 6 + col;
  state[coltops[col]][col] = player;
  document.getElementById(fillbox).classList.add('box' + player);

  if (checkWin(fillbox)) {
    alert('Player ' + (player === 1 ? 'red' : 'yellow') + ' wins!');
  }

  coltops[col]--;

  if (player == 1) {
    player = -1;
  } else {
    player = 1;
  }
}

function checkWin(boxID) {
  const r = Math.floor(boxID / 6);
  const c = boxID % 6;
  function checker(dr, dc) {
    let hits = 0;
    for (let i = -3; i < 4; i++) {
      const row = r + i * dr;
      const col = c + i * dc;
      if (
        row >= 0 &&
        col >= 0 &&
        row < 6 &&
        col < 6 &&
        state[row][col] === player
      ) {
        hits++;
      } else {
        hits = 0;
      }
      if (hits === 4) {
        return true;
      }
    }
    return false;
  }

  if (checker(1, 0) || checker(0, 1) || checker(1, 1) || checker(-1, 1)) {
    return true;
  }

  return false;
}
