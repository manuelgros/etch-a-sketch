//Create the Grid for #canvas
  
//Loop that creates Array based on height and width of desired canvas
let canvasHeight = 32;
let canvasWidth = 32;

function getTiles(canvasHeight, canvasWidth) {
  let tileArray = [];
  for (let i = 0; i <= (canvasHeight*canvasWidth-1); i++) {
    tileArray.push(i);
  }
  return tileArray;
}

console.log(getTiles(32, 32));

//Loop that takes tileArray and creates a div element for each of the array items

function createCanvas(array) {
  const canvas = document.querySelector("#canvas");
  for (i = 0; i < array.length; i++) {
    let div = document.createElement("div");
    div.classList.add("tile");
    div.setAttribute('id', `tile${[i]}`);
    // div.innerHTML = `•`;
    canvas.appendChild(div);
  }
}

//Run functions to create Canvas
createCanvas(getTiles(32, 32));

//Implement drawing function 
const tiles = document.querySelectorAll(".tile");

//First two eventListener register if mouse is pressed and let user draw continuously
let mouseIsDown = false;
for (let i = 0; i < tiles.length; i++) {
  tiles[i].addEventListener('mousedown', () => {mouseIsDown = true});
  tiles[i].addEventListener('mouseup', () => {mouseIsDown = false});
  tiles[i].addEventListener('click', (e) => {
    e.target.style.backgroundColor = paintColor;
  });
  tiles[i].addEventListener('mouseover', (e) => {
    if (mouseIsDown) {
      e.target.style.backgroundColor = paintColor;
    }
  });
}

// Let user use buttons to set paint color
  //Still have to find a way to change the hover color, too
let paintColor = "black";
const btnBlack = document.querySelector("#black");
const btnRed = document.querySelector("#red");
const btnWhite = document.querySelector("#white");

btnBlack.addEventListener('click', () => {
  paintColor = "black";
  return paintColor;
});

btnRed.addEventListener('click', () => {
  paintColor = "red";
  return paintColor;
});

btnWhite.addEventListener('click', () => {
  paintColor = "white";
  return paintColor;
});

