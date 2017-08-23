/**
 * Module for hand maker functions.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

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
 * The handPrototype represents the prototype of the Hand object.
 *
 * @type {{add: handPrototype.add, discard: handPrototype.discard, toJSON: handPrototype.toJSON, toString: handPrototype.toString}}
 */
const handPrototype = {
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

    return createHand([...this.playingCards, ...playingCards]);
  },

  /**
   * Returns a copy of the hand, with the specified playing cards removed.
   *
   * @returns {Hand}
   */
  discard: function(playingCardsToDiscard) {
    // Filter the remaining playing cards.
    let remainingPlayingCards = this.playingCards.filter(pc =>
        !playingCardsToDiscard.find(pctd => pctd === pc));

    return createHand(remainingPlayingCards);
  },

  /**
   * Returns an object to stringify.
   *
   * @returns {{count: number, playingCards: PlayingCard[], value: number}}
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
 * Creats a new hand.
 *
 * @param {PlayingCard[]} playingCards
 * @returns {Hand}
 */
const createHand = (playingCards = []) =>
  Object.freeze(Object.create(handPrototype, {
    'count': {
      enumerable: true,
      value: playingCards.length
    },
    'playingCards': {
      enumerable: true,
      value: Object.freeze([...playingCards])
    },
    'value': {
      enumerable: true,
      value: getValue(playingCards)
    }
  }));

/**
 * Returns the hand's value, the sum of the ranks.
 *
 * @returns {number}
 */
const getValue = (playingCards) => {
  // Compute the hand value where each ace is 14 points.
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
  createHand,
  getValue
};
