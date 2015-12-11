//Check if any 2 of 3 given numbers in an array are equal to another given number and the third is 0. If so, return the index of the 0.

var api = {}

api.find = function find(arr, fn) {
  for (var i=0; i < arr.length; i++) {
    if (fn(arr[i])) {
      return arr[i]
    }
  } return -1
}

api.isNumber = function isNumber(val) {
  return (typeof(val) == "number")
}

api.findWinMove = function findWinMove(num, arr) {
  if (arr.some((arg) => arg != num && arg != 0)) {
    return -1
  }
  if ( arr.indexOf(0) != arr.lastIndexOf(0) ) {
    return -1
  }
  return arr.indexOf(0)
}

api.findCurrentCombos = function(winCombos, squaresData) {
  return winCombos.map(function(innerArr) {
    return innerArr.map((arg) => squaresData[arg])
  })
}

api.checkWinMove = function checkWinMove(winCombos, squaresData, num) {
  var currentCombos = api.findCurrentCombos(winCombos, squaresData)
  return currentCombos.reduce(function(seed, arr, i){   //return array with index of winning space
    if (seed != null) return seed
    var winI = api.findWinMove(num, arr)
    if (winI > -1) return winCombos[i][winI]
  }, null)
}

//For AI - Check if any move can win the game, and return the index of that square

api.aiWinIndex = function aiWinIndex(winCombos, squaresData) {
  return api.checkWinMove(winCombos, squaresData, 2)
}

//For AI - check if any move can prevent the player from winning, and return the index of that square

api.aiBlockIndex = function aiBlockIndex(winCombos, squaresData) {
  return api.checkWinMove(winCombos, squaresData, 1)
}

//Select an item from the squaresData array with a value of 0 and return its index

api.aiRandomSelect = function aiRandomSelect(squaresData) {
  var availSquareIndexes = squaresData.reduce(function(newArray, currentItem, index) {
    if (currentItem === 0) {
      return newArray.concat(index)
    } else {
      return newArray
    }
  }, [])
  return availSquareIndexes[Math.floor(Math.random() * availSquareIndexes.length)]
}

//Combine the above 3 in priority order to return AI's move selection

api.aiSelect = function aiSelect(winCombos, squaresData) {
  console.log("win index", api.aiWinIndex(winCombos, squaresData), "block index", api.aiBlockIndex(winCombos, squaresData))
  if (api.aiWinIndex(winCombos, squaresData) >= 0) {
    return api.aiWinIndex(winCombos, squaresData)
  } else {
    if (api.aiBlockIndex(winCombos, squaresData) >= 0) {
      return api.aiBlockIndex(winCombos, squaresData)
    } else {
      return api.aiRandomSelect(squaresData)
    }
  }
}

//Called on selection of a square. In squaresData array, check if corresponding item is blank.  If so, update to 1 if player, 2 if AI. If not, do not change.

api.assignSquare = function assignSquare(squaresData, index, whoseTurn, squaresElems) {
  var data = squaresData[index]
  if (data === 0) {
    if (whoseTurn === "player") {
      squaresData[index] = 1
      squaresElems[index].innerHTML = "X"
    } else {
      squaresData[index] = 2
      squaresElems[index].innerHTML = "O"
    }
    return true
  } else {
    return false
  }
}

//CHECKS TO SEE IF GAME IS OVER

//if data points referenced by combo INDEXES are all equal to 1 or all equal to 2, return true; else return false.

api.checkWinCombo = function checkWinCombo(combo, squaresData) {
  return (
    combo.every(function(index) { return squaresData[index] === 1 }) ||
    combo.every(function(index) { return squaresData[index] === 2 })
  )
}

//return true if any win combos have been met

api.checkWinCombos = function checkWinCombos(winCombos, squaresData) {
  return winCombos.some((combo) => api.checkWinCombo(combo, squaresData) )
}

//check if any of the remaining squares have a value of 0

api.isInArray = function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

api.emptySquaresLeft = function emptySquaresLeft(squaresData) {
  return api.isInArray(0, squaresData)
}

module.exports = api
