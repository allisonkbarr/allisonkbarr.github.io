
//data for tic tac toe board

var squaresData = [0, 0, 0, 0, 0, 0, 0, 0, 0]

var squaresElems = [].slice.call(document.querySelectorAll("td"))

//indexes for win combos

var winCombos = [
  [ 0, 1, 2 ],
  [ 3, 4, 5 ],
  [ 6, 7, 8 ],
  [ 0, 3, 6 ],
  [ 1, 4, 7 ],
  [ 2, 5, 8 ],
  [ 0, 4, 8 ],
  [ 2, 4, 6 ],
]



//GAMEPLAY


//Helper functions

function find(arr, fn) {
  for (var i=0; i < arr.length; i++) {
    if (fn(arr[i])) {
      return arr[i]
    }
  } return -1
}

function isNumber(val) {
  return (typeof(val) == "number")
}


//Check if any 2 of 3 given numbers in an array are equal to another given number and the third is 0. If so, return the index of the 0.

function findWinMove(num, arr) {
  if (arr.some((arg) => arg != num && arg != 0)) {
    return -1
  }
  if ( arr.indexOf(0) != arr.lastIndexOf(0) ) {
    return -1
  }
  return arr.indexOf(0)
}

//Run findWinMove across all the win combos

function checkWinMove(num) {
  var currentCombos = winCombos.map(function(innerArr) {
    return innerArr.map((arg) => squaresData[arg])
  })
  return currentCombos.reduce(function(seed, arr, i){   //return array with index of winning space
    if (seed) return seed
    var winI = findWinMove(num, arr)
    if (winI > -1) return winCombos[i][winI]
  }, 0)
}

//For AI - Check if any move can win the game, and return the index of that square

function aiWinIndex() {
  return checkWinMove(2)
}

//For AI - check if any move can prevent the player from winning, and return the index of that square

function aiBlockIndex() {
  return checkWinMove(1)
}

//Select an item from the squaresData array with a value of 0 and return its index

function aiRandomSelect() {
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

function aiSelect() {
  console.log("win index", aiWinIndex(), "block index", aiBlockIndex())
  if (aiWinIndex() >= 0) {
    return aiWinIndex()
  } else {
    if (aiBlockIndex() >= 0) {
      return aiBlockIndex()
    } else {
      return aiRandomSelect()
    }
  }
}


//Called on selection of a square. In squaresData array, check if corresponding item is blank.  If so, update to 1 if player, 2 if AI. If not, do not change.

function assignSquare(index, whoseTurn) {
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

function checkWinCombo(combo) {
  return (
    combo.every(function(item) { return squaresData[item] === 1 }) ||
    combo.every(function(item) { return squaresData[item] === 2 })
  )
}

//return true if any win combos have been met

function checkWinCombos() {
  return winCombos.some(checkWinCombo)
}

//check if any of the remaining squares have a value of 0

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function emptySquaresLeft() {
  return isInArray(0, squaresData)
}


//EXECUTION


document.querySelector("table").addEventListener("click", function(e){

  // player tries a move
  var playerTakesSquare = assignSquare(squaresElems.indexOf(e.target), "player")

  // if player picked occupied spot, return
  if (!playerTakesSquare) return

  // if someone won, the player won!
  if (checkWinCombos()) {
    return document.getElementById("message").innerHTML = "You Win! Grats!"
  }

  // if game is over, and noone won, it is a tie
  if (!emptySquaresLeft()) {
    return document.getElementById("message").innerHTML = "It's a tie! Try again."
  }

  // if game isnt over, let the AI go
  setTimeout(()=>{
    assignSquare(aiSelect())
    // if game is over, and someone won, the ai won!
    if (checkWinCombos()) {
      return document.getElementById("message").innerHTML = "You Lose. Try again!"
    }

    // if game is over, and noone won, it is a tie
    if (!emptySquaresLeft()) {
      return document.getElementById("message").innerHTML = "It's a tie! Try again."
    }

  }, 200)


  // if game is not over, it is users turn again

})

//reset game - if user clicks refresh button, reset the array to all 0s and update the UI to match

document.getElementById("refresh").addEventListener("click", function() {
  squaresData = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  squaresElems.forEach(function(td){td.innerHTML = ""})
  document.getElementById("message").innerHTML = ""
})
