/**
 * Module for card table functions.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const Ranks = require('./Ranks');
const util = require('./util');

/**
 * Creates a new dealer.
 * 
 * @returns {Object}
 */
const createDealer = (playingCards) => {
  let nickName = 'Dealer';
  let drawPile = [...playingCards];
  let discardPile = [];
  let hand = createHand();

  return {
    canHit: (hitLimit) => hand.getCount() < 2 || hand.getValue() < hitLimit,
    hand,
    nextCard: () => drawPile.shift(),
    nickName,
    reuseDiscardPile: () => {
      drawPile = [...drawPile, discardPile];
      discardPile = [];
    },
    shuffle: () => drawPile = util.shuffle(drawPile),
    toString: () => `${nickName}: ${hand.getCount() > 0 ? hand.toString() : '-'}`
  };
};

/**
 * Creates a new player.
 * 
 * @returns {Object}
 */
const createPlayer = (id = 1, hitLimit = 8) => {
  let nickName = Number.isInteger(id) ? `Player #${id}` : id;
  let hand = createHand();

  return {
    nickName,
    hand,
    canHit: () => hand.getCount() < 2 || hand.getValue() <= hitLimit,
    toString: () => `${nickName}: ${hand.toString()}`
  };
};

/**
 * Creates a new hand.
 * 
 * @returns {Object}
 */
const createHand = () => {
  let playingCards = [];

  const getValue = () => {
    // Ace one point!
    let sum = playingCards.reduce((sum, x) => sum + x.rank, 0);

    // Ace 1 or 14 points!
    let numberOfAces = playingCards.filter(x => x.rank === Ranks.ACE).length;
    while (numberOfAces-- > 0 && sum + 13 < 21) {
      sum += 13;
    }

    return sum;
  };

  return {
    add: (playingCard) => playingCards = [...playingCards, playingCard],
    getCount: () => playingCards.length,
    discard: () => playingCards.splice(0),
    getValue,
    toString: () => `${playingCards.join(' ')} (${getValue()})`
  };
};

// Exports.
module.exports = {
  createDealer,
  createPlayer
};
