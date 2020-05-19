// XXXXXXXXXXXXXXXXXX HUD VARIABLES XXXXXXXXXXXXXXXXXXXX
let startButton;
let resetButton;
let cellType;
let algoType;
// XXXXXXXXXXXXXXXXXX HUD VARIABLES XXXXXXXXXXXXXXXXXXXX

// XXXXXXXXXXXXXXXXX SKETCH VARIABLES XXXXXXXXXXXXXXXXX
let GRID = [];
let cellSize = 30;
let startX;
let startY;
let endX;
let endY;
// XXXXXXXXXXXXXXXXX SKETCH VARIABLES XXXXXXXXXXXXXXXXX
// holds a grid per iteration step
let algoVisSteps = [];
// current iteration step counter
let algoVisStep = 0;
// display the visualisation or not
let displayAlgoViz = false;
// visualisation interval

function setup() {
  createCanvas(1350, 630);
  initialiseGrid();
  createHud();
}

function draw() {
  background(100);

  if (displayAlgoViz) {
    drawGrid(algoVisSteps[algoVisStep]);
    // gotoNextFrame();
    // console.log(algoVisStep);
    // algoVisStep = (algoVisStep + 1) % algoVisSteps.length;
    algoVisStep = algoVisStep + 1;
    if (algoVisStep >= algoVisSteps.length) {
      stopAlgoVisualisation();
    }
  } else {
    drawGrid(GRID);
    placeMarkers();
  }
}

function drawGrid(GRID) {
  // draw the grid
  for (let row = 0; row < GRID.length; row++) {
    for (let col = 0; col < GRID[0].length; col++) {
      GRID[row][col].show();
    }
  }
}

function placeMarkers() {
  let posx = floor(map(mouseX, 0, width, 0, GRID[0].length));
  let posy = floor(map(mouseY, 0, height, 0, GRID.length));
  let markerType = cellType.value();

  if (posx >= 0 && posy >= 0 && posx < GRID[0].length && posy < GRID.length) {
    if (mouseIsPressed && markerType == "START") {
      GRID[startX][startY].isStart = false;
      GRID[posy][posx].isStart = true;
      startX = posy;
      startY = posx;
    }
    if (mouseIsPressed && markerType == "END") {
      GRID[endX][endY].isEnd = false;
      GRID[posy][posx].isEnd = true;
      endX = posy;
      endY = posx;
    }
    if (mouseIsPressed && markerType == "WALLS") {
      GRID[posy][posx].isWall = true;
    }
  }
}

function createHud() {
  startButton = createButton("START");
  startButton.mousePressed(applyAlgo);
  resetButton = createButton("RESET");
  resetButton.mousePressed(initialiseGrid);

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
  resetVisualisation();
  GRID = create2dArray(floor(height / cellSize), floor(width / cellSize));

  for (let col = 0; col < GRID[0].length; col++) {
    for (let row = 0; row < GRID.length; row++) {
      let newCell = new Cell(col * cellSize, row * cellSize);
      GRID[row][col] = newCell;
    }
  }

  // center element is start
  startX = floor(GRID.length / 2);
  startY = floor(GRID[0].length / 2);
  GRID[startX][startY].isStart = true;
  endX = GRID.length - 13;
  endY = GRID[0].length - 10;
  GRID[endX][endY].isEnd = true;

  addNeighbours();
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

function applyAlgo() {
  algo = algoType.value();
  if (algo === "BREADTH FIRST SEARCH!") {
    bfs();
    startAlgoVisualisation();
  } else if (algo === "DEPTH FIRST SEARCH") {
    dfs();
    startAlgoVisualisation();
  } else {
    console.warn(algo, "not implemented yet!");
  }
}

function addNeighbours() {
  // add only non diagonal elements
  // add neighbours of non boundary cells
  for (let row = 1; row < GRID.length - 1; row++) {
    for (let col = 1; col < GRID[0].length - 1; col++) {
      let current = GRID[row][col];
      current.neighbours = [
        GRID[row - 1][col],
        GRID[row][col - 1],
        GRID[row + 1][col],
        GRID[row][col + 1],
      ];
    }
  }
  // add neighbours of upper and lower boundary cells
  for (let col = 1; col < GRID[0].length - 1; col++) {
    let upper_boundary = GRID[0][col];
    upper_boundary.neighbours = [
      GRID[0][col - 1],
      GRID[0][col + 1],
      GRID[1][col],
    ];
    let lower_boundary = GRID[GRID.length - 1][col];
    lower_boundary.neighbours = [
      GRID[GRID.length - 1][col - 1],
      GRID[GRID.length - 1][col + 1],
      GRID[GRID.length - 1 - 1][col],
    ];
  }
  // add neighbours of left and right boundary cells
  for (let row = 1; row < GRID.length - 1; row++) {
    let left_boundary = GRID[row][0];
    left_boundary.neighbours = [
      GRID[row - 1][0],
      GRID[row + 1][0],
      GRID[row][1],
    ];
    let right_boundary = GRID[row][GRID[0].length - 1];
    right_boundary.neighbours = [
      GRID[row - 1][GRID[0].length - 1],
      GRID[row + 1][GRID[0].length - 1],
      GRID[row][GRID[0].length - 1 - 1],
    ];
  }
  // add neighbours of four corner cells
  let upper_left_corner = GRID[0][0];
  upper_left_corner.neighbours = [GRID[0 + 1][0], GRID[0][0 + 1]];

  let upper_right_corner = GRID[0][GRID[0].length - 1];
  upper_right_corner.neighbours = [
    GRID[0 + 1][GRID[0].length - 1],
    GRID[0][GRID[0].length - 1 - 1],
  ];

  let lower_right_corner = GRID[GRID.length - 1][GRID[0].length - 1];
  lower_right_corner.neighbours = [
    GRID[GRID.length - 1 - 1][GRID[0].length - 1],
    GRID[GRID.length - 1][GRID[0].length - 1 - 1],
  ];

  let lower_left_corner = GRID[GRID.length - 1][0];
  lower_left_corner.neighbours = [
    GRID[GRID.length - 1 - 1][0],
    GRID[GRID.length - 1][0 + 1],
  ];
}
// XXXXXXXXXXXXXXXX HELPER FUNCTIONS XXXXXXXXXXXXXXXXXX
function addVisualisationStep() {
  //draw();
  algoVisSteps.push(shallowCopyGrid(GRID));
  // console.log("recorded", algoVisSteps.length, "frames");
}

function startAlgoVisualisation() {
  displayAlgoViz = true;
}

function stopAlgoVisualisation() {
  displayAlgoViz = false;
}

function resetVisualisation() {
  stopAlgoVisualisation();
  algoVisStep = 0;
  while (algoVisSteps.length > 0) {
    delete algoVisSteps[0];
    algoVisSteps.shift();
  }
}

function shallowCopyGrid(grid) {
  let copy = [];

  for (let i = 0; i < grid.length; i++) {
    let list = [];

    for (let j = 0; j < grid[i].length; j++) {
      list.push(grid[i][j].shallowCopy());
    }

    copy.push(list);
  }

  return copy;
}
