
var assert = require('assert')
var game = require('../js/game')

describe('findWinMove', function() {

  it ('should return -1 when there is no winning move for the AI because there are too many open spaces', function() {
    assert.equal(-1, game.findWinMove(2, [0,0,0]))
    assert.equal(-1, game.findWinMove(2, [2,0,0]))
    assert.equal(-1, game.findWinMove(2, [0,2,0]))
    assert.equal(-1, game.findWinMove(2, [0,0,2]))
  })

  it ('should return -1 when there is no winning move for the player because there are too many open spaces', function() {
    assert.equal(-1, game.findWinMove(1, [0,0,0]))
    assert.equal(-1, game.findWinMove(1, [1,0,0]))
    assert.equal(-1, game.findWinMove(1, [0,1,0]))
    assert.equal(-1, game.findWinMove(1, [0,0,1]))
  })

  it ('should return -1 when there is no winning move for the AI because the player has taken one or more of the spaces (but at least one space is open still)', function() {
    assert.equal(-1, game.findWinMove(2, [1,0,0]))
    assert.equal(-1, game.findWinMove(2, [0,1,0]))
    assert.equal(-1, game.findWinMove(2, [0,0,1]))
    assert.equal(-1, game.findWinMove(2, [1,1,0]))
    assert.equal(-1, game.findWinMove(2, [1,0,1]))
    assert.equal(-1, game.findWinMove(2, [0,1,1]))
    assert.equal(-1, game.findWinMove(2, [2,0,1]))
    assert.equal(-1, game.findWinMove(2, [0,2,1]))
    assert.equal(-1, game.findWinMove(2, [1,0,2]))
    assert.equal(-1, game.findWinMove(2, [0,1,2]))
    assert.equal(-1, game.findWinMove(2, [1,2,0]))
    assert.equal(-1, game.findWinMove(2, [2,1,0]))
  })

  it ('should return -1 when there is no winning move for the player because the AI has taken one or more of the spaces (but at least one space is open still)', function() {
    assert.equal(-1, game.findWinMove(1, [2,0,0]))
    assert.equal(-1, game.findWinMove(1, [0,2,0]))
    assert.equal(-1, game.findWinMove(1, [0,0,2]))
    assert.equal(-1, game.findWinMove(1, [2,2,0]))
    assert.equal(-1, game.findWinMove(1, [2,0,2]))
    assert.equal(-1, game.findWinMove(1, [0,2,2]))
    assert.equal(-1, game.findWinMove(1, [2,0,1]))
    assert.equal(-1, game.findWinMove(1, [0,2,1]))
    assert.equal(-1, game.findWinMove(1, [1,0,2]))
    assert.equal(-1, game.findWinMove(1, [0,1,2]))
    assert.equal(-1, game.findWinMove(1, [1,2,0]))
    assert.equal(-1, game.findWinMove(1, [2,1,0]))
  })

  it ('should return -1 when there is no winning move for the AI because the spaces are full', function() {
    assert.equal(-1, game.findWinMove(2, [1,1,1]))
    assert.equal(-1, game.findWinMove(2, [1,2,2]))
    assert.equal(-1, game.findWinMove(2, [1,2,1]))
    assert.equal(-1, game.findWinMove(2, [1,1,2]))
    assert.equal(-1, game.findWinMove(2, [2,1,2]))
    assert.equal(-1, game.findWinMove(2, [2,1,1]))
    assert.equal(-1, game.findWinMove(2, [2,2,1]))
    assert.equal(-1, game.findWinMove(2, [2,2,2]))

  })

  it ('should return -1 when there is no winning move for the player because the spaces are full', function() {
    assert.equal(-1, game.findWinMove(1, [1,1,1]))
    assert.equal(-1, game.findWinMove(1, [1,2,2]))
    assert.equal(-1, game.findWinMove(1, [1,2,1]))
    assert.equal(-1, game.findWinMove(1, [1,1,2]))
    assert.equal(-1, game.findWinMove(1, [2,1,2]))
    assert.equal(-1, game.findWinMove(1, [2,1,1]))
    assert.equal(-1, game.findWinMove(1, [2,2,1]))
    assert.equal(-1, game.findWinMove(1, [2,2,2]))

  })

  it ('should return 0 when there is a winning move for the AI in the first space', function() {
    assert.equal(0, game.findWinMove(2, [0,2,2]))
  })

  it ('should return 1 when there is a winning move for the AI in the second space', function() {
    assert.equal(1, game.findWinMove(2, [2,0,2]))
  })

  it ('should return 2 when there is a winning move for the AI in the third space', function() {
    assert.equal(2, game.findWinMove(2, [2,2,0]))
  })
  it ('should return 0 when there is a winning move for the player in the first space', function() {
    assert.equal(0, game.findWinMove(1, [0,1,1]))
  })

  it ('should return 1 when there is a winning move for the player in the second space', function() {
    assert.equal(1, game.findWinMove(1, [1,0,1]))
  })

  it ('should return 2 when there is a winning move for the player in the third space', function() {
    assert.equal(2, game.findWinMove(1, [1,1,0]))
  })

})
