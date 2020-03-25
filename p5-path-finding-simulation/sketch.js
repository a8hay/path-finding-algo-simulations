// XXXXXXXXXXXXXXXXXX HUD VARIABLES XXXXXXXXXXXXXXXXXXXX
let startButton;
let resetButton;
let cellType;
let algoType;
// XXXXXXXXXXXXXXXXXX HUD VARIABLES XXXXXXXXXXXXXXXXXXXX

// XXXXXXXXXXXXXXXXX SKETCH VARIABLES XXXXXXXXXXXXXXXXX
let GRID = [];
let cellSize = 30;
// XXXXXXXXXXXXXXXXX SKETCH VARIABLES XXXXXXXXXXXXXXXXX

function setup() {
  createCanvas(1350, 630);
  initialiseGrid();
  createHud();
}

function draw() {
  background(100);
  //   draw grid
  for (let row = 0; row < GRID.length; row++) {
    for (let col = 0; col < GRID[0].length; col++) {
      GRID[row][col].show();
    }
  }
  //   draw grid
}

function createHud() {
  startButton = createButton("START");
  resetButton = createButton("RESET");

  cellType = createSelect();
  cellType.option("WALLS");
  cellType.option("START");
  cellType.option("END");

  algoType = createSelect();
  algoType.option("BREADTH FIRST SEARCH!");
  algoType.option("DEPTH FIRST SEARCH");
  algoType.option("DIJKASHTRA");
  algoType.option("A*");
}

function initialiseGrid() {
  GRID = create2dArray(floor(height / cellSize), floor(width / cellSize));
  for (let col = 0; col < GRID[0].length; col++) {
    for (let row = 0; row < GRID.length; row++) {
      let newCell = new Cell(col * cellSize, row * cellSize);
      GRID[row][col] = newCell;
    }
  }
}

// XXXXXXXXXXXXXXXX HELPER FUNCTIONS XXXXXXXXXXXXXXXXXX
function create2dArray(m, n) {
  // array of m rows and n columns
  resultArray = [];
  for (let row = 0; row < m; row++) {
    let tempRow = [];
    for (let col = 0; col < n; col++) {
      tempRow.push(0);
    }
    resultArray.push(tempRow);
  }
  return resultArray;
}
// XXXXXXXXXXXXXXXX HELPER FUNCTIONS XXXXXXXXXXXXXXXXXX
