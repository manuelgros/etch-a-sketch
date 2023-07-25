//Create the Grid for #canvas
  
//Loop that creates Array based on height and width of desired canvas
let canvasHeight = 16;
let canvasWidth = 16;

function getTiles(canvasHeight, canvasWidth) {
  let tileArray = [];
  for (let i = 0; i <= (canvasHeight*canvasWidth-1); i++) {
    tileArray.push(i);
  }
  return tileArray;
}

console.log(getTiles(16, 16));

//Loop that takes tileArray and creates a div element for each of the array items

function createCanvas(array) {
  const canvas = document.querySelector("#canvas");
  for (i = 0; i < array.length; i++) {
    let div = document.createElement("div");
    div.classList.add("tile");
    div.setAttribute('id', `tile${[i]}`);
    div.innerHTML = `tile${[i]}`;
    canvas.appendChild(div);
  }
}

createCanvas(getTiles(16, 16));