//Create the Grid for #canvas
  //Set Size for Canvas
let canvasHeight = 16;
let canvasWidth = 16;
  //Loop that creates Array based on height and width of desired canvas
function getTileArray(height, width) {
  let tileArray = [];
  for (let i = 0; i <= (height*width-1); i++) {
    tileArray.push(i);
  }
  return tileArray;
}
  //Loop that takes tileArray and creates a div (tiles of grit)
function getTileElements(array) {
  const canvas = document.querySelector("#canvas");
  for (i = 0; i < array.length; i++) {
    let div = document.createElement("div");
    div.classList.add("tile");
    div.setAttribute('id', `tile${[i]}`);
    // div.innerHTML = `•`;
    canvas.appendChild(div);
  }
  // let tiles = document.querySelectorAll(".tile");
  // return tiles;
}
getTileElements(getTileArray(canvasHeight, canvasWidth)); //initial function call
  
  // Set tile size trough function to make grit size adjustable 
let tiles = document.querySelectorAll(".tile");
function getTileSize(height, width) {
  let tiles = document.querySelectorAll(".tile");
  for (let i = 0; i < tiles.length; i++) {
    // tiles[i].setAttribute("style",`height:${480/height}px; width:${480/width}px`);
    tiles[i].style.width = `${480/height}px`;
    tiles[i].style.height = `${480/width}px`;
  }
}
getTileSize(canvasHeight, canvasWidth); //Initial function call

  //bringing together the single steps of canvas creations
function createCanvas (height, width) {
  getTileElements(getTileArray(height, width));
  getTileSize(height, width);
}

  //Deleting old Tiles (necessary when creating Canvas with different sized grit)
function deleteTiles() {
  let tiles = document.querySelectorAll(".tile");
  for (let i = 0; i < tiles.length; i++) {
    document.getElementById(`tile${[i]}`).remove();
  }
}

//Set grit Size to button selection
const btnSize = document.querySelectorAll(".sizes");
for (i = 0; i < btnSize.length; i++) {
  btnSize[i].addEventListener('click', (e) => {
    deleteTiles();//deleting old grit
    let canvasHeight = e.target.getAttribute('data-size');//set height
    let canvasWidth = e.target.getAttribute('data-size');//set width
    getTileElements(getTileArray(canvasHeight, canvasWidth));//getting tile elements with new arguments
    getTileSize(canvasHeight, canvasWidth);//set tile height/width based on new dimensions
    draw();
  })
} 


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
function draw() {
  let tiles = document.querySelectorAll(".tile");
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
}
draw(); //initial function call


// Let user use buttons to set paint color
  //Still have to find a way to change the hover color, too
let paintColor = "black"; //initially selected color
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
