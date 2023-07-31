//Create the Grid for #canvas
  //Set Size for Canvas
let canvasHeight = 32;
let canvasWidth = 32; 
  //Loop that creates Array based on height and width of desired canvas
function getTiles(canvasHeight, canvasWidth) {
  let tileArray = [];
  for (let i = 0; i <= (canvasHeight*canvasWidth-1); i++) {
    tileArray.push(i);
  }
  return tileArray;
}
  //Loop that takes tileArray and creates a div (tiles of grit)
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
createCanvas(getTiles(canvasHeight, canvasWidth));
  // Set tile size trough function to make grit size adjustable 
const tiles = document.querySelectorAll(".tile");
function getTileSize() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].setAttribute("style",`height:${480/canvasHeight}px; width:${480/canvasWidth}px`);
  }
}
getTileSize();


// Rainbow button
const btnRainbow = document.querySelector("#rainbow");
let rainbowOn = false;
  //changing btn colors depending if on or off
function rainbowBtnColor() {
  if (rainbowOn) {
    btnRainbow.style.color = 'white';
    btnRainbow.style.backgroundColor = 'black';
  } else {
    btnRainbow.style.color = 'black';
    btnRainbow.style.backgroundColor = 'white';
  }
}
function toggleRainbow() {
  rainbowOn = !rainbowOn;
  rainbowBtnColor();
  console.log(rainbowOn)
}
btnRainbow.addEventListener('click', toggleRainbow);
  //Create "Rainbow" color
function random(number) {
  return Math.floor(Math.random() * number);
}
function rainbowGenerator() {
  const randomColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  return randomColor;
}


//Implement drawing function 
let mouseIsDown = false;
for (let i = 0; i < tiles.length; i++) {
  //First two eventListener register if mouse is pressed and let user draw continuously
  tiles[i].addEventListener('mousedown', () => {mouseIsDown = true});
  tiles[i].addEventListener('mouseup', () => {mouseIsDown = false});
  // including the rainbow mode 
  tiles[i].addEventListener('click', (e) => {
    if (rainbowOn) {
    e.target.style.backgroundColor = rainbowGenerator();
    } else {
      e.target.style.backgroundColor = paintColor;
    }
});
  tiles[i].addEventListener('mouseover', (e) => {
    if (mouseIsDown) {
      if (rainbowOn) {
      e.target.style.backgroundColor = rainbowGenerator();
      } else {
        e.target.style.backgroundColor = paintColor;
      }
  }})
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
