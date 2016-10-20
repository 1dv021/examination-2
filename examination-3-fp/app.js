/**
 * Starting point of the application.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const cardGame = require('./src/cardGame');

let results = cardGame.playRound(10);

for (let result of results) {
  console.log(result, '\n');
}
