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