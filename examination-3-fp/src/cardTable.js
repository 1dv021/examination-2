/**
 * Module for card table functions.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const cardMaker = require('./cardMaker');
const util = require('./util');

/**
 * Creates a new dealer.
 * 
 * @returns {Object}
 */
const createDealer = (playingCards) => {
  const nickName = 'Dealer';
  let dealersShoe = [...playingCards];
  let discardPeal = [];
  let hand = Object.freeze(createHand());

  return {
    canHit: (hitLimit) => hand.count() < 2 || hand.value() < hitLimit,
    hand,
    nextCard: () => dealersShoe.shift(),
    nickName,
    reuseDiscardedPlayingCards: () => {
      dealersShoe = [...dealersShoe, discardPeal];
      discardPeal = [];
    },
    shuffle: () => dealersShoe = util.shuffle(dealersShoe),
    toString: () => `${nickName}: ${hand.count() > 0 ? hand.toString() : '-'}`
  };
};

/**
 * Creates a new player.
 * 
 * @returns {Object}
 */
const createPlayer = (hitLimit = 8) => {
  const nickName = 'Player #1';
  let hand = Object.freeze(createHand());

  return {
    nickName,
    hand,
    canHit: () => hand.count() < 2 || hand.value() <= hitLimit,
    toString: () => `${nickName}: ${hand.toString()}`
  };
};

/**
 * Creates a new hand.
 * 
 * @returns {Object}
 */
const createHand = () => {
  let playingCards = Object.freeze([]);

  return {
    add: (playingCard) => playingCards = Object.freeze([...playingCards, playingCard]),
    count: () => playingCards.length,
    discard: () => {
      let discardedPlayingCards = playingCards;
      playingCards = Object.freeze([]);
      return discardedPlayingCards;
    },
    value: () => cardMaker.getPlayingCardValuePointSum(playingCards),
    toString: () => `${playingCards.join(' ')} (${cardMaker.getPlayingCardValuePointSum(playingCards)})`
  };
};

// Exports.
module.exports = {
  createDealer,
  createPlayer
};
