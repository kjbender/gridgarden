var _ = require('lodash');

const plantList = ["", "tomato", "corn", "beans", "onion", "carrot", "broccoli", "chili", "eggplant", "peas", "pepper", "radish", "garlic", "pumpkin", "lettuce", "potato", "red onion", "cucumber"];

const companionMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, -1, -1, 0, 1, 1, -1, 0, 0, 0, 0, 0, 1, 0, 1, -1, 1, -1],
  [0, -1, 0, 1, 0, 1, 0, 0, 0, 1, -1, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 1, 0, -1, 1, -1, -1, 1, 1, -1, 1, -1, 1, 1, 1, -1, 1],
  [0, 1, 0, -1, 0, 1, 1, 1, 0, -1, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1],
  [0, -1, 0, -1, 1, 0, 0, -1, 0, 0, -1, 0, 1, -1, -1, 1, 1, 0],
  [0, 0, 0, -1, 1, 0, -1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, -1, 1, 0, 1, 1, 0, 1, 1, -1, 0, 0, 0, -1, 1],
  [0, 0, -1, -1, 1, 0, -1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, -1, 0, 1],
  [0, 1, 0, -1, 0, 1, 1, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
  [0, 1, 0, 1, 1, 1, -1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1],
  [0, -1, 1, 1, 1, 0, 1, 0, 1, 0, 0, -1, 0, -1, 0, 0, 1, -1],
  [0, 1, 0, -1, 0, 1, 1, 1, 0, -1, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, -1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, -1, 0, 0]
];

const makeMove = function (plot, move) {
  const row = move[0];
  const col = move[1];
  const plant = move[2];
  let newPlot = plot.map((x, indexX) =>
    (indexX === row) ? x.map((y, indexY) => (indexY === col) ? plant : y) : x
  )
  return newPlot;
}

const checkMove = function (plot, move) {

  const row = move[0];
  const col = move[1];

  // see what's around the planting space given in the move 
  // name these above/below/right/left and assign boolean value if conflict exists 
  const plant = move[2];
  // get values around cell (assign -1 if outside of plot; handles cells on edges)
  const above = (row === 0) ? -1 : plot[row - 1][col];
  const below = (row === plot.length - 1) ? -1 : plot[row + 1][col];
  const left = (col === 0) ? -1 : plot[row][col - 1];
  const right = (col === plot[0].length - 1) ? -1 : plot[row][col + 1];

  // order cardinal directions in an array; loop through to find conflicts (add message if true)
  let adjacentPlants = [above, below, left, right];
  let messages = [];
  let conflicts = [];
  // don't do the following if there is no plant in the cell 
  if (plant > 0) {
    for (var adjPlant of adjacentPlants) {
      // first check compatibility of plants in non-empty spaces 
      if (adjPlant > 0) {
        if (companionMatrix[adjPlant][plant] < 0) {
          messages.push(plantList[plant] + ' and ' + plantList[adjPlant] + ' may not grow well together');
          conflicts.push(true);
        } else {
          //messages.push('');
          conflicts.push(false);
        }
      } 
    }
  }
  let conflictState = (conflicts.length === 0)? '': (conflicts.indexOf(true) !== -1)? true: false; 

  let suggestionSets = [];
  // only add to set if space is empty
  if (plant === 0) {
    // check against adjacent plants and create lists of suggestions
    for (var adjPlant of adjacentPlants) {
      // don't use adjacent empty cells (no useful information there)
      if (adjPlant > 0) {
        let adjPlantSuggestions = [];
        for (var i = 0; i < companionMatrix[adjPlant].length; i++) {
          if (companionMatrix[adjPlant][i] === 1) {
            //adjPlantSuggestions.push(plantList[i])
            // return the negative of the plant (for display purposes on front end)
            adjPlantSuggestions.push(-i);
          }
        }
        suggestionSets.push(adjPlantSuggestions);
      }
    }
  }
  let suggestionIntersection = _.intersection.apply(_, suggestionSets);

  return { row, col, plant, above, below, left, right, adjacentPlants, conflicts, conflictState, messages, suggestionSets, suggestionIntersection }
}

// if (error) {
//   res.writeHead(400, "error message")
//   return res.end()
// } else {
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

exports.transformPlot = function (req, res) {

  const givenGarden = req.body;
  let plantedList = []; 
  let checkArray = [];
  for (var j = 0; j < givenGarden.length; j++) {
    let checkRow = [];
    for (var k = 0; k < givenGarden[0].length; k++) {
      if (givenGarden[j][k] > 0) {
        plantedList.push(givenGarden[j][k]); 
      }
      let move = [j, k, givenGarden[j][k]];
      let check = checkMove(givenGarden, move);
      checkRow.push(check);
    }
    checkArray.push(checkRow);
  }

  plantedList.sort((a, b) => a - b);

  let conflictArray = checkArray.map(function (row) {
    return row.map(function (cell) {
      return cell.conflictState;
    })
  })

  let transformedGarden = checkArray.map(function (row) {
    return row.map(function (cell) {
      // if cell is empty, returning cell.suggestionIntersection gives the array of options
      let numberOfSuggestions = cell.suggestionIntersection.length;
      let randomIndex = getRandomInt(numberOfSuggestions);
      // consider just including one for ease of use (?)
      return (cell.plant > 0 || numberOfSuggestions === 0) ? cell.plant : cell.suggestionIntersection[randomIndex];
    })
  })

  //console.log('server', givenGarden); 
  res.send({ givenGarden, transformedGarden, conflictArray, plantedList, checkArray });
}
