//Create the Grid for #canvas
  //Initial size for Canvas
const defaultGritSize = 16
let canvasHeight = defaultGritSize;
let canvasWidth = defaultGritSize;
  // Set grit size by slider
const gritSizeSlider = document.querySelector("#gritSlider");
window.addEventListener("load", startupGritSizeSlider, false);
function startupGritSizeSlider() {
  gritSizeSlider.value = defaultGritSize;
  gritSizeSlider.addEventListener("input", updateGritSize, false);
}
function updateGritSize() {
  deleteTiles();
  let canvasHeight = gritSizeSlider.value;
  let canvasWidth = gritSizeSlider.value;
  getTileElements(getTileArray(canvasHeight, canvasWidth));
  getTileSize(canvasHeight, canvasWidth);
  setCanvasColor(backgroundColor);
  gritToggle();
  draw();
}
  //Set text for the size display
const outputGritSize1 = document.querySelector("#gritValue1");
const outputGritSize2 = document.querySelector("#gritValue2")
outputGritSize1.textContent = gritSizeSlider.value;
outputGritSize2.textContent = gritSizeSlider.value;
gritSizeSlider.oninput = function () {
  outputGritSize1.textContent = this.value;
  outputGritSize2.textContent = this.value;
}
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
    canvas.appendChild(div);
  }
}
  // Set tile size trough function to make grit size adjustable 
let tiles = document.querySelectorAll(".tile");
function getTileSize(height, width) {
  const canvas = document.querySelector("#canvas");
  let canvasHInPx = window.getComputedStyle(canvas).height;
  let canvasWInPx = window.getComputedStyle(canvas).width;
  let canvasH = canvasHInPx.slice(0, canvasHInPx.indexOf("p"));
  let canvasW = canvasWInPx.slice(0, canvasWInPx.indexOf("p"));
  let tiles = document.querySelectorAll(".tile");
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].style.width = `${canvasW/width}px`;
    tiles[i].style.height = `${canvasH/height}px`;
  }
}
  //bringing together the single steps of canvas creations
function createCanvas(height, width) {
  getTileElements(getTileArray(height, width));
  getTileSize(height, width);
}
  //set canvas background color 
function setCanvasColor(backgroundColor) {
  let tiles = document.querySelectorAll(".tile");
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].style.setProperty('background-color', `${backgroundColor}`);
  }
}
  //Deleting old Tiles (necessary when creating Canvas with different sized grit)
function deleteTiles() {
  let tiles = document.querySelectorAll(".tile");
  for (let i = 0; i < tiles.length; i++) {
    document.getElementById(`tile${[i]}`).remove();
  }
}



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
      } else if (darkenOn || lightenOn) {
      dodgeAndBurn(e.target);
        e.target.classList.add('painted');
      } else if (eraserOn) {
        e.target.style.backgroundColor = backgroundColor;
        e.target.classList.remove('painted');
      }else {
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
        } else if (darkenOn || lightenOn) {
          dodgeAndBurn(e.target);
          e.target.classList.add('painted');
        } else if (eraserOn) {
          e.target.style.backgroundColor = backgroundColor;
          e.target.classList.remove('painted');
        }else {
          e.target.style.backgroundColor = paintColor;
          e.target.classList.add('painted');
        }
    }})
  }
}



//Color Picker to select paint color
const colorPicker = document.querySelector("#colorPicker");
const defaultColor = "#000000";
let paintColor = "#000000";
window.addEventListener("load", startupColorPicker, false);
function startupColorPicker() {
  colorPicker.value = defaultColor;
  colorPicker.addEventListener("input", updateColor, false);
  colorPicker.addEventListener("blur", updateColor, false);//sets color even without change
}
function updateColor() {
  paintColor = colorPicker.value;
  rainbowOn = false;
  darkenOn = false;
  eraserOn = false;
  lightenOn = false;
  toggleBtnColor(btnDarken, darkenOn);
  toggleBtnColor(btnRainbow, rainbowOn);
  toggleBtnColor(btnEraser, eraserOn);
  toggleBtnColor(btnLighten, lightenOn);
}



//Color Picker to select Background Color
const backgroundPicker = document.querySelector("#backgroundPicker");
const defaultBackground = "#ffffff";
let backgroundColor = "#ffffff";
window.addEventListener("load", startupBackgroundPicker, false);
function startupBackgroundPicker() {
  backgroundPicker.value = defaultBackground;
  backgroundPicker.addEventListener("input", updateBackground, false);
}
function updateBackground() {
  backgroundColor = backgroundPicker.value;
  setCanvasColor(backgroundColor);
}



//Eraser feature
const btnEraser = document.querySelector("#eraser");
let eraserOn = false;
btnEraser.addEventListener('click', () => {
  rainbowOn = false;
  darkenOn = false;
  eraserOn = !eraserOn;
  lightenOn = false;
  toggleBtnColor(btnDarken, darkenOn);
  toggleBtnColor(btnRainbow, rainbowOn);
  toggleBtnColor(btnEraser, eraserOn);
  toggleBtnColor(btnLighten, lightenOn);
})



//Darken and Lighten Effect
function dodgeAndBurn(e) {
  const color = e.style.backgroundColor;
  //creates array by taking the rgb value and slicing it up, so that we end up with the three numbers
  let rgbArray = color.slice(color.indexOf("(") + 1, color.indexOf(")")).split(", ");
  const newRgbArray = []
  if (darkenOn) {
    for (i = 0; i < rgbArray.length; i++) {
      let colorNr = +rgbArray[i] - (+rgbArray[i]*0.1);
      newRgbArray.push(colorNr);
    }} else if (lightenOn) {
      for (i = 0; i < rgbArray.length; i++) {
        if (+rgbArray[i] == 0) { //makes it possible to lighten black
          let colorNr = +rgbArray[i] + 20;
          newRgbArray.push(colorNr);
        } else {
          let colorNr = +rgbArray[i] + (+rgbArray[i]*0.1);
          newRgbArray.push(colorNr);
        }
      } 
    }
    e.style.backgroundColor = `rgb(${newRgbArray[0]}, ${newRgbArray[1]}, ${newRgbArray[2]})`;
  }
  // Darken effect
const btnDarken = document.querySelector('#toggleDarken');
let darkenOn = false;
btnDarken.addEventListener('click', () => {
  darkenOn = !darkenOn;
  toggleBtnColor(btnDarken, darkenOn);
  //Deactivate Rainbow and Eraser when darken is on 
  rainbowOn = false;
  toggleBtnColor(btnRainbow, rainbowOn);
  eraserOn = false;
  toggleBtnColor(btnEraser, eraserOn);
  lightenOn = false;
  toggleBtnColor(btnLighten, lightenOn);
})
 // Lighten Effect
const btnLighten = document.querySelector("#toggleLighten");
let lightenOn = false;
btnLighten.addEventListener('click', () => {
  lightenOn = !lightenOn;
  toggleBtnColor (btnLighten, lightenOn);
  rainbowOn = false;
  toggleBtnColor (btnRainbow, rainbowOn)
  darkenOn = false;
  toggleBtnColor (btnDarken, darkenOn)
  eraserOn = false;
  toggleBtnColor (btnEraser, eraserOn)
})



// Rainbow mode
const btnRainbow = document.querySelector("#rainbow");
let rainbowOn = false;
  //Toggle rainbow mode on/off
function toggleRainbow() {
  rainbowOn = !rainbowOn;
  toggleBtnColor(btnRainbow,rainbowOn);//changes btn color when toggled on
  //Deactivates darken and eraser when rainbow is on
  darkenOn = false;
  eraserOn = false;
  lightenOn = false;
  toggleBtnColor(btnDarken, darkenOn);
  toggleBtnColor(btnEraser, eraserOn);
  toggleBtnColor(btnLighten, lightenOn);
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



// Clear button 
const btnClear = document.querySelector('#clear');
btnClear.addEventListener('click', () => {
  setCanvasColor(backgroundColor);
});



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
    btn.classList.add("toggleOn");
  } else {
    btn.classList.remove("toggleOn");
  }
}



//Initial function calls to create canvas
addEventListener('load', () => {
  createCanvas(canvasHeight, canvasWidth);
  setCanvasColor(backgroundColor);
  draw(); 
})
