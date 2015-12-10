
import api from './game'

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


//EXECUTION


document.querySelector("table").addEventListener("click", function(e){

  // player tries a move
  var playerTakesSquare = api.assignSquare(squaresData, squaresElems.indexOf(e.target), "player", squaresElems)

  // if player picked occupied spot, return
  if (!playerTakesSquare) return

  // if someone won, the player won!
  if (api.checkWinCombos(winCombos, squaresData)) {
    return document.getElementById("message").innerHTML = "You Win! Grats!"
  }

  // if game is over, and noone won, it is a tie
  if (!api.emptySquaresLeft(squaresData)) {
    return document.getElementById("message").innerHTML = "It's a tie! Try again."
  }

  // if game isnt over, let the AI go
  setTimeout(()=>{
    api.assignSquare(squaresData, api.aiSelect(winCombos, squaresData), "ai", squaresElems)
    // if game is over, and someone won, the ai won!
    if (api.checkWinCombos(winCombos, squaresData)) {
      return document.getElementById("message").innerHTML = "You Lose. Try again!"
    }

    // if game is over, and noone won, it is a tie
    if (!api.emptySquaresLeft(squaresData)) {
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
