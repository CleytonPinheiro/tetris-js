//Shapes
const gridWidth = 10;
const shapeFreezeAudio = new Audio("./audios/audios_audios_tetraminoFreeze.wav");
const completedLineAudio = new Audio("./audios/audios_audios_completedLine.wav");
const gameOverAudio = new Audio("./audios/audios_audios_gameOver.wav");

const lShape = [
  [1, 2, gridWidth + 1, gridWidth*2 + 1],
  [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth*2 + 2],
  [1, gridWidth + 1, gridWidth*2, gridWidth*2 + 1],
  [gridWidth, gridWidth*2, gridWidth*2 + 1, gridWidth*2 + 2]
];

const zShape = [
  [gridWidth + 1, gridWidth + 2, gridWidth*2, gridWidth*2 + 1],
  [0, gridWidth, gridWidth + 1, gridWidth*2 + 1],
  [gridWidth + 1, gridWidth + 2, gridWidth*2, gridWidth*2 + 1],
  [0, gridWidth, gridWidth + 1, gridWidth*2 + 1]
];

const tShape = [
  [1, gridWidth, gridWidth + 1, gridWidth + 2],
  [1, gridWidth + 1, gridWidth + 2, gridWidth*2 + 1],
  [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth*2 + 1],
  [1, gridWidth, gridWidth + 1, gridWidth*2 + 1]
];

const oShape = [
  [0, 1, gridWidth, gridWidth + 1],
  [0, 1, gridWidth, gridWidth + 1],
  [0, 1, gridWidth, gridWidth + 1],
  [0, 1, gridWidth, gridWidth + 1]
];

const iShape = [
  [1, gridWidth + 1, gridWidth*2 + 1, gridWidth*3 + 1],
  [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3],
  [1, gridWidth + 1, gridWidth*2 + 1, gridWidth*3 + 1],
  [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3]
];

const allShapes = [lShape, zShape, tShape, oShape, iShape];

const colors = ["blue", "yellow", "red", "orange", "pink"];
let currentColor = Math.floor(Math.random() * colors.length);
let nextColor = colors[currentColor];

let currentPosition = 3;
let currentRotation = 0;
let randomShape = Math.floor(Math.random() * allShapes.length);
let currentShape = allShapes[randomShape][currentRotation];
let gridSquares = Array.from(document.querySelectorAll(".grid div"));

function draw() {
  currentShape.forEach(squareIndex => {
    gridSquares[squareIndex + currentPosition].classList.add("shapePainted", `${colors[currentColor]}`);
  })
};

draw();

function undraw() {
  currentShape.forEach(squareIndex => {
      gridSquares[squareIndex + currentPosition].classList.remove("shapePainted", `${colors[currentColor]}`);
  })
};

function moveDown() {
  freeze();
  undraw();
  currentPosition += 10;
  draw();
};

const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", () => {
  window.location.reload();
});

//setInterval(moveDown, 600);
let timeMoveDown = 600;
let timerId = null;
const startStopButton = document.getElementById("start-button");

startStopButton.addEventListener("click", () => {
  if(timerId) {
    clearInterval(timerId);
    timerId = null;
  } else {
    timerId = setInterval(moveDown, timeMoveDown);
  }
});

function freeze() {
  if(currentShape.some(squareIndex =>
    gridSquares[squareIndex + currentPosition + gridWidth].classList.contains("filled"))) {
    currentShape.forEach(squareIndex => gridSquares[squareIndex + currentPosition].classList.add("filled"));

    currentPosition = 3;
    currentRotation = 0;
    randomShape = nextRandomShape;
    currentShape = allShapes[randomShape][currentRotation];
    currentColor = nextColor;
    draw();

    checkIfRowIsFilled();

    updateScore(13);

    shapeFreezeAudio.play();
    displayNextShape();
    gameOver();
  }
};

function moveLeft() {
  const isEdgeLimit = currentShape.some(squareIndex => (squareIndex + currentPosition) % gridWidth === 0);

  if(isEdgeLimit) return;

  const isFilled =  currentShape.some(squareIndex =>
      gridSquares[squareIndex + currentPosition -1].classList.contains("filled")
  );

  if(isFilled) return;

  undraw();
  currentPosition--;
  draw();
};

function moveRight() {
  const isEdgeLimit = currentShape.some(squareIndex => (squareIndex + currentPosition) % gridWidth === gridWidth -1);

  if(isEdgeLimit) return;

  const isFilled = currentShape.some(squareIndex =>
    gridSquares[squareIndex + currentPosition + 1].classList.contains("filled")
  );
  
  if(isFilled) return;
  
  undraw();
  currentPosition++;
  draw();
};

function previousRotation() {
  if(currentRotation === 0) {
    currentRotation = currentShape.length - 1;
  } else {
    currentRotation--;
  }
  
  currentShape = allShapes[randomShape][currentRotation];
};

function rotate() {
  undraw();
  if(currentRotation === currentShape.length - 1) {
    currentRotation = 0;
  } else {
    currentRotation++;
  }

  currentShape = allShapes[randomShape][currentRotation];

  const isLeftEdgeLimit =  currentShape.some(squareIndex => (squareIndex + currentPosition) % gridWidth === 0);
  const isRightEdgeLimit = currentShape.some(squareIndex => (squareIndex + currentPosition) % gridWidth === gridWidth - 1);

  if(isLeftEdgeLimit && isRightEdgeLimit) {
    previousRotation();
  }

  const isFilled = currentShape.some(squareIndex =>
      gridSquares[squareIndex + currentPosition].classList.contains("filled")
  )
  if(isFilled) {
     previousRotation();
  }

  draw();  
};

const miniGridSquares = document.querySelectorAll(".mini-grid div");
const miniGridWidth = 6;
const nextPosition = 2;
const possibleNextShapes = [
  [1, 2, miniGridWidth + 1, miniGridWidth*2 + 1],
  [miniGridWidth + 1, miniGridWidth + 2, miniGridWidth*2, miniGridWidth*2 + 1],
  [1, miniGridWidth, miniGridWidth + 1, miniGridWidth + 2],
  [0, 1, miniGridWidth, miniGridWidth + 1],
  [0, 1, miniGridWidth, miniGridWidth + 1]
];

let nextRandomShape = Math.floor(Math.random() * possibleNextShapes.length);

function displayNextShape() {
  miniGridSquares.forEach(square => square.classList.remove("shapePainted", `${colors[nextColor]}`));
  nextRandomShape = Math.floor(Math.random() * possibleNextShapes.length);
  nextColor = Math.floor(Math.random() * colors.length);
  const nextShape = possibleNextShapes[nextRandomShape];
  nextShape.forEach(squareIndex => 
    miniGridSquares[squareIndex + nextPosition + miniGridWidth].classList.add("shapePainted", `${colors[nextColor]}`)
  );
};

displayNextShape();

const $score = document.querySelector(".score");
let score =0;

function updateScore(updateValue) {
  score += updateValue;
  $score.textContent = score;

  clearInterval(timerId);

  if(score <=  450) {
    timeMoveDown = 500;
  } else if(450 < score && score <= 1000) {
    timeMoveDown = 400;
  } else if(1000 < score && score <= 1700) {
    timeMoveDown = 300;
  }  else if(1700 < score && score <= 2700) {
    timeMoveDown = 200;
  }  else if(2700 < score && score <= 3850) {
    timeMoveDown = 150;
  }  else {
    timeMoveDown = 110;
  }

  timerId = setInterval(moveDown, timeMoveDown);
};

function gameOver() {
  if(currentShape.some(squareIndex => 
    gridSquares[squareIndex + currentPosition].classList.contains("filled")
  )) {
    updateScore(-13);
    clearInterval(timerId);
    timerId = null;
    startStopButton.disabled = true;
    gameOverAudio.play();
    score.innerHtml += "<br />" + "GAME OVER";
  }
};

document.addEventListener('keydown', controlKeyboard);

let grid = document.querySelector(".grid");

function checkIfRowIsFilled() {
  for(var row =0; row < gridSquares.length; row += gridWidth) {
    let currentRow = [];

    for(var square = row; square < row + gridWidth; square++) {
      currentRow.push(square);
    }

    const isRowPainted = currentRow.every(square =>
      gridSquares[square].classList.contains("shapePainted")
    );

    if(isRowPainted) {
      const squareRemoved = gridSquares.splice(row, gridWidth);
      squareRemoved.forEach(square =>
        square.removeAttribute("class")
      );

      gridSquares = squareRemoved.concat(gridSquares);
      gridSquares.forEach(square => grid.appendChild(square));

      updateScore(97);
      completedLineAudio.play();
    }
  }
};

function controlKeyboard(event) {
  if(timerId) {
    if(event.key === "ArrowLeft") {
    moveLeft();
    } else if(event.key === "ArrowRight") {
      moveRight();
    } else if(event.key === "ArrowDown") {
      moveDown();
    } else if(event.key === "ArrowUp") {    
      rotate();
    }
  }  
};