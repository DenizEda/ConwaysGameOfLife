const width = 25;
const height = 20;

const gol = new GameOfLife(width, height);

const tds = [];

const table = document.createElement("tbody");

for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);

const paint = () => {
  tds.forEach((td) => {
    const cellValue = gol.getCell(td.dataset.row, td.dataset.col);
    if (cellValue === 1) {
      td.classList.add("alive");
    } else {
      td.classList.remove("alive");
    }
  });
};

document.getElementById("board").addEventListener("click", (event) => {
  gol.toggleCell(event.target.dataset.row, event.target.dataset.col);
  paint();
});

document.getElementById("step_btn").addEventListener("click", (event) => {
  gol.tick();
  paint();
});

let interval = null;

document.getElementById("play_btn").addEventListener("click", (event) => {
  if (!interval) {
    interval = setInterval(() => {
      gol.tick();
      paint();
    }, 100);
  } else {
    clearInterval(interval);
    interval = null;
  }
});

document.getElementById("random_btn").addEventListener("click", (event) => {
  gol.forEachCell((row, col) => {
    gol.setCell(Math.round(Math.random()), row, col);
  });
  paint();
});

document.getElementById("clear_btn").addEventListener("click", (event) => {
  gol.forEachCell((row, col) => {
    gol.setCell(0, row, col);
  });
  paint();
});

const patternSelect = document.getElementById("patterns");

patternSelect.addEventListener("change", (event) => {
  gol.forEachCell((row, col) => {
    gol.setCell(0, row, col);
  });
  let makePattern = patterns[event.target.value];
  makePattern();
  paint();
  patternSelect.selectedIndex = 0;
});

const readTwoDarr = (customBoard) => {
  function helper(customBoard) {
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        setCell(customBoard[row][col], row, col);
      }
    }
  }
  return helper(customBoard);
};

const saveCustom = (twoDarr, name) => {
  const nameValue = name.toLowerCase().split().join("");
  patterns[nameValue] = readTwoDarr(twoDarr);
};

document.getElementById("save").addEventListener("onsubmit", (e) => {
  e.preventDefault();
  console.log(e.target.value);
});
