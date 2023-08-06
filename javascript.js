//Create the Grid for #canvas
  //Initial size for Canvas
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
  //Loop that takes tileArray and creates a div's based on it (tiles of grit)
function getTileElements(array) {
  const canvas = document.querySelector("#canvas");
  for (i = 0; i < array.length; i++) {
    let div = document.createElement("div");
    div.classList.add("tile");
    div.setAttribute('id', `tile${[i]}`);
    // div.innerHTML = `•`;
    canvas.appendChild(div);
  }
}
  // Set tile size trough function to make grit size adjustable 
let tiles = document.querySelectorAll(".tile");
function getTileSize(height, width) {
  let tiles = document.querySelectorAll(".tile");
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].style.width = `${500/height}px`;
    tiles[i].style.height = `${500/width}px`;
  }
}
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


// Rainbow mode
const btnRainbow = document.querySelector("#rainbow");
let rainbowOn = false;
  //Toggle rainbow mode on/off
function toggleRainbow() {
  rainbowOn = !rainbowOn;
  toggleBtnColor(btnRainbow,rainbowOn);//changes btn color when toggled on
  console.log(rainbowOn)
}
  //let button toggle rainbow mode
btnRainbow.addEventListener('click', toggleRainbow);
  //Create "Rainbow" color
function random(number) {
  return Math.floor(Math.random() * number);
}
function rainbowGenerator() {
  const randomColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  return randomColor;
} // see draw() for implementation of rainbow mode in drawing process


//Implement drawing function 
function draw() {
  let tiles = document.querySelectorAll(".tile");
  let mouseIsDown = false; //register if mouse is pressed and let user draw continuously
  document.addEventListener('mousedown', () => {mouseIsDown = true});
  document.addEventListener('mouseup', () => {mouseIsDown = false}); 
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', (e) => {
      // including the rainbow mode
      if (rainbowOn) {
      e.target.style.backgroundColor = rainbowGenerator();
      e.target.classList.add('painted');
      } else {
        e.target.style.backgroundColor = paintColor;
        e.target.classList.add('painted');
      }
  });
    tiles[i].addEventListener('mouseover', (e) => {
      if (mouseIsDown) {
        // including the rainbow mode
        if (rainbowOn) {
        e.target.style.backgroundColor = rainbowGenerator();
        e.target.classList.add('painted');
        } else {
          e.target.style.backgroundColor = paintColor;
          e.target.classList.add('painted');
        }
    }})
  }
}


// Let user use buttons to set paint color
let paintColor = "black"; //initially selected color
const btnColors = document.querySelectorAll('#paintControls button');
for (i = 0; i < btnColors.length; i++) {
  btnColors[i].addEventListener('click', (e) => {
    paintColor = e.target.id;
  })
}


// Clear button 
const btnClear = document.querySelector('#clear');
btnClear.addEventListener('click', () => {
  let paintedTiles = document.querySelectorAll(".painted");
  for (let i = 0; i < paintedTiles.length; i++) {
    // paintedTiles[i].style.setProperty('background-color', 'initial');
    paintedTiles[i].style.removeProperty('background-color');
    paintedTiles[i].classList.remove('painted');
  }
})


// Toggle Grit 
const btnGrit = document.querySelector("#toggleGrit");
let gritOn = false;
function gritToggle() {
  let tiles = document.querySelectorAll(".tile");
  for (i = 0; i < tiles.length; i++) {
    if (gritOn) {
      tiles[i].classList.add('gritOn');
    } else {
      tiles[i].classList.remove('gritOn');
    }
  }
}
btnGrit.addEventListener('click', () => {
  gritOn = !gritOn;
  gritToggle()
  toggleBtnColor(btnGrit, gritOn);//changes btn color when toggled on
})

 
//Changing btn colors, indicating of toggled On or Off
 function toggleBtnColor(btn, condition) {
  if (condition) {
    btn.style.color = 'white';
    btn.style.backgroundColor = 'black';
  } else {
    btn.style.color = 'black';
    btn.style.backgroundColor = 'white';
  }
}


//Initial function calls to create canvas
addEventListener('load', () => {
  getTileElements(getTileArray(canvasHeight, canvasWidth)); 
  getTileSize(canvasHeight, canvasWidth); 
  draw(); 
})