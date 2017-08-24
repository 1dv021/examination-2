/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const game = require('./src/game')

let results = game.playRound(10)

for (let result of results) {
  console.log(result, '\n')
}
