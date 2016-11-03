/**
 * Module for hand maker functions.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

// const cardMaker = require('./src/cardMaker');
const Ranks = require('./cardMaker').Ranks;

/**
 * A playing card hand.
 *
 * @typedef {Object} Hand
 * @property {number} count - The number of playing cards of the hand.
 * @property {PlayingCard[]} playingCards - The hand's playing cards.
 * @property {number} value - The hand's value.
 * @property {function} add - Returns a copy of the hand with a playing card added to it.
 * @property {function} toJSON - Returns an object to stringify.
 * @property {function} toString - Returns a string representing the object.
 */

/**
 * 
 * @type {{toJSON: protoPlayingCard.toJSON, toString: protoPlayingCard.toString}}
 */
const playingHandPrototype = {
  /**
   * Returns a copy of the hand with one or more playing cards added to it.
   *
   * @param {PlayingCard|PlayingCard[]} playingCards
   * @returns {Hand}
   */
  add: function(playingCards) {
    if (typeof playingCards[Symbol.iterator] !== 'function') {
      playingCards = [playingCards];
    }

    return createPlayingHand([...this.playingCards, ...playingCards]);
  },

  /**
   * Returns a copy of the hand, with the specified playing cards removed.
   *
   * @returns {Hand}
   */
  discard: function(playingCardsToDiscard) {
    // Filter the remaning playing cards.
    let remaningPlayingCards = this.playingCards.filter(pc =>
        !playingCardsToDiscard.find(pctd => pctd === pc));

    return createPlayingHand(remaningPlayingCards);
  },

  /**
   * Returns an object to stringify.
   *
   * @returns {{count: {number}, playingCards: {PlayingCards[]}, value: {number}}}
   */
  toJSON: function() {
    return {
      count: this.count,
      playingCards: this.playingCards,
      value: this.value
    };
  },

  /**
   * Returns a string representing the object.
   *
   * @returns {string} 
   */
  toString: function() {
    return this.count > 0 ?
      `${this.playingCards.join(' ')} (${this.value})` :
      '-';
  }
};

/**
 * Creats a new playing hand.
 *
 * @param {PlayingCard[]} playingCards
 * @returns {Hand}
 */
const createPlayingHand = (playingCards = []) =>
  Object.create(playingHandPrototype, {
    'count': {
      enumerable: true,
      value: playingCards.length
    },
    'playingCards': {
      enumerable: true,
      value: [...playingCards]
    },
    'value': {
      enumerable: true,
      configurable: true,
      value: get21Value(playingCards)
    }
  });

/**
 * Returns the hand's value, the sum of the ranks.
 *
 * @returns {number}
 */
const getValue = (playingCards) => {
  // Compute the hand value where each ace is 14 points.
  return playingCards.reduce((sum, x) => sum + x.rank, 0);
};

/**
 * Returns the hand's value.
 *
 * @returns {number}
 */
const get21Value = (playingCards) => {
  // Compute the hand value where each ace is 14 points...
  let handValue = playingCards.reduce((sum, x) => sum + x.rank, 0);

  // ...and count exach ace as one point as long as the hand value i greater than 21.
  let numberOfAces = playingCards.filter(x => x.rank === Ranks.ACE).length;
  while (numberOfAces-- > 0 && handValue > 21) {
    handValue -= 13;
  }

  return handValue;
};

// Exports
module.exports = {
  createPlayingHand,
  getValue
};
