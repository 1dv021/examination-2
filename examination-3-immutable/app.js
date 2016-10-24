/**
 * Starting point of the application.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const cardHand = require('./src/cardHand');
const cardMaker = require('./src/cardMaker');

const Ranks = require('./src/Ranks');
const Suits = require('./src/Suits');

let hand = cardHand
  .createHand()
  .add(cardMaker.createPlayingCard(Ranks.JACK, Suits.DIAMONDS))
  .add(cardMaker.createPlayingCard(Ranks.FOUR, Suits.SPADES));

console.log(hand);
console.log(hand.toString());

for (let s of Object.keys(Suits)) {
  for (let r of Object.keys(Ranks)) {
    console.log(cardMaker.createPlayingCard(Ranks[r], Suits[s]));
  }
}