/**
 * Starting point of the application.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const CardTable = require('./src/CardTable');
const Outcomes = require('./src/Outcomes');

let cardTables = [
  new CardTable('Table #1', ['Marie', undefined, 'Antony']),
  new CardTable('Table #2', ['Patrick', 'Hattie', 'Kristle', 'Shelby']),
  new CardTable('Table #3', ['John', undefined, undefined, undefined, 'Christopher'])
];

for (let cardTable of cardTables) {
  cardTable.play();
  console.log('******************************');
  console.log('***       ', cardTable.tableName, '       ***');
  console.log('******************************');
  for (let outcome of cardTable.outcomes) {
    let player = JSON.parse(outcome.player);
    let dealer = JSON.parse(outcome.dealer);

    console.log(player.text, player.busted ? 'BUSTED!' : '');
    console.log(dealer.text, dealer.busted ? 'BUSTED!' : '');
    console.log((dealer.outcome === Outcomes.WIN ?
      dealer.nickName :  player.nickName) +
      ' wins!', '\n------------------------------');
  }
}
