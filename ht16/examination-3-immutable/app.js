/**
 * Starting point of the application.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const cardMaker = require('./src/cardMaker');
const gameMaker = require('./src/gameMaker');
const participantMaker = require('./src/participantMaker');

let dealer = participantMaker.createDealer(cardMaker.createDrawPile());
let players = [
  participantMaker.createParticipant('Player #1'),
  participantMaker.createParticipant('Player #2'),
  participantMaker.createParticipant('Player #3'),
  participantMaker.createParticipant('Player #4'),
  participantMaker.createParticipant('Player #5'),
];
let game = gameMaker.createGame(dealer, players);

game = game.play();
for (let outcome of game.outcomes) {
  console.log(outcome.player.toString());
  console.log(outcome.dealer.toString());
  console.log(outcome.text, '\n');
}
