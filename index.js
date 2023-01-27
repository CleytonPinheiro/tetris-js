//Shapes
const gridWidth = 10;

const lShape = [
    [1, 2 , gridWidth + 1 ,gridWidth*2 + 1],
    [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth*2 +2],
    [1, gridWidth +1, gridWidth*2, gridWidth*2 +1, gridWidth*2 + 2],
    [gridWidth, gridWidth*2, gridWidth*2 +1, gridWidth*2 +2],
]

const zShape = [
  [gridWidth + 1, gridWidth + 2, gridWidth*2, gridWidth*2 + 1],
  [0, gridWidth, gridWidth + 1, gridWidth*2 + 1],
  [gridWidth + 1, gridWidth + 2, gridWidth*2, gridWidth*2 + 1],
  [0, gridWidth, gridWidth + 1, gridWidth*2 + 1]
]

const tShape = [
  [1, gridWidth, gridWidth + 1, gridWidth + 2],
  [1, gridWidth + 1, gridWidth + 2, gridWidth*2 + 1],
  [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth*2 + 1],
  [1, gridWidth, gridWidth + 1, gridWidth*2 + 1]
]

const oShape = [
  [0, 1, gridWidth, gridWidth + 1],
  [0, 1, gridWidth, gridWidth + 1],
  [0, 1, gridWidth, gridWidth + 1],
  [0, 1, gridWidth, gridWidth + 1]
]

const iShape = [
  [1, gridWidth + 1, gridWidth*2 + 1, gridWidth*3 + 1],
  [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3],
  [1, gridWidth + 1, gridWidth*2 + 1, gridWidth*3 + 1],
  [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3]
]

const allShapes = [lShape, zShape, tShape, oShape, iShape];

let currentPosition = 3;
let currentRotation = 0;
let randomShape = Math.floor(Math.random() * allShapes.length);
let currentShape = allShapes[randomShape][currentRotation];
let gridSquares = document.querySelectorAll(".grid div");

function draw() {
    currentShape.forEach(squareIndex => {
        gridSquares[squareIndex + currentPosition].classList.add("shapePainted");
    })
}

function undraw() {
    currentShape.forEach(squareIndex => {
        gridSquares[squareIndex + currentPosition].classList.remove("shapePainted");
    })
}

function moveDown() {
    undraw();
    currentPosition += 10;
    draw();
}

setInterval(moveDown, 600);

draw();

