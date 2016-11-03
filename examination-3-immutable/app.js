/**
 * Starting point of the application.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const cardMaker = require('./src/cardMaker');
const handMaker = require('./src/handMaker');
const participantMaker = require('./src/participantMaker');

const Ranks = cardMaker.Ranks;
const Suits = cardMaker.Suits;

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

let drawPile = cardMaker.createDrawPile().shuffle();

console.log(drawPile.toString());

let hand = handMaker.createPlayingHand();

let result = drawPile.draw();

hand = hand.add(result.cards);
drawPile = result.drawPile;

console.log(hand.toString());
console.log(drawPile.toString());

