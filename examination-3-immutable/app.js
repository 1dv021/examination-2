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
];
let game = gameMaker.createGame(dealer, players);

game = game.play();
for (let outcome of game.outcomes) {
  console.log(outcome.player.toString());
  console.log(outcome.dealer.toString());
  console.log(outcome.text, '\n');
}


// const cardMaker = require('./src/cardMaker');
// const participantMaker = require('./src/participantMaker');

// let dealer = participantMaker.createDealer(cardMaker.createDrawPile());
// let players = [
//   participantMaker.createParticipant('Player #1'),
//   participantMaker.createParticipant('Player #2'),
//   participantMaker.createParticipant('Player #3'),
// ];

// for (let i = 0; i < players.length; i++) {
//   let result = dealer.deal();
//   dealer = result.dealer;
//   players[i] = players[i].add(result.playingCards);
// }

// for (let i = 0; i < players.length; i++) {
//   let result = dealer.deal();
//   dealer = result.dealer;
//   players[i] = players[i].add(result.playingCards);

//   while (players[i].canHit) {
//     result = dealer.deal();
//     dealer = result.dealer;
//     players[i] = players[i].add(result.playingCards);
//   }
// }

// for (let player of players) {
//   console.log(player.toString());
// }
// console.log(dealer.toString());

// let hand = cardHand
//   .createHand()
//   .add(cardMaker.createPlayingCard(Ranks.JACK, Suits.DIAMONDS))
//   .add(cardMaker.createPlayingCard(Ranks.FOUR, Suits.SPADES));

// console.log(hand);
// console.log(hand.toString());


// let cards = cardMaker.createPlayingCards();
// let dealer = participantMaker.createParticipant('Dealer');
// let player2 = participantMaker.createParticipant('Player #2');

// dealer = participantMaker.promoteToDealer(dealer, cards);

// let card = dealer.deal();

// player2 = player2.draw(card);

// console.log(player1.toString());
// console.log(player2.toString());

// let drawPile = cardMaker.createDrawPile().shuffle();

// console.log(drawPile.toString());

// let hand = handMaker.createPlayingHand();

// let result = drawPile.draw(2);

// hand = hand.add(result.playingCards);
// drawPile = result.drawPile;

// console.log(hand.toString());
// console.log(drawPile.toString());

