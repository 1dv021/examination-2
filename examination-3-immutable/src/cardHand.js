/**
 * Module for playing card hand functions.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const Ranks = require('./Ranks');
const utils = require('./utils');

/**
 * A playing card hand.
 *
 * @typedef {Object} Hand
 * @property {number} count - The number of playing cards of the hand.
 * @property {PlayingCard[]} playingCards - The hand's playing cards.
 * @property {number} value - The hand's value.
 * @property {function} add - Returns a copy of the hand with a playing card added to it.
 * @property {function} toString - Returns a string representing the object.
 */

/**
 * Creates a new hand.
 *
 * @param {PlayingCard[]} playingCards
 * @returns {Hand}
 */
const createHand = (playingCards = []) => {

  /**
   * The hand's playing cards.
   *
   * @type {PlayingCard[]}
   */
  const _playingCards = Object.freeze([...playingCards]);

  // Return an immutable object.
  return Object.freeze({
    count: _playingCards.length,
    playingCards: _playingCards,
    value: getValue(_playingCards),
    add: (playingCard) => add(_playingCards, playingCard),
    toString: () => toString(_playingCards)
  });
};

/**
 * Returns a copy of the hand with a playing card added to it.
 *
 * @param {PlayingCard} playingCard
 * @returns {Hand}
 */
const add = (playingCards, playingCard) => createHand(utils.add(playingCards, playingCard));

/**
 * Returns the hand's value.
 *
 * @returns {number}
 */
const getValue = (playingCards) => {
  // Compute the hand value where each ace is one point...
  let handValue = playingCards.reduce((sum, x) => sum + x.rank, 0);

  // ...and count exach ace as 14 point as long as the hand value i less than 21.
  let numberOfAces = playingCards.
  filter(x => x.rank === Ranks.ACE).length;
  while (numberOfAces-- > 0 && handValue + 13 < 21) {
    handValue += 13;
  }

  return handValue;
};

/**
 * Returns a string representing the object.
 *
 * @returns {string}
 */
const toString = (playingCards) => playingCards.length > 0 ?
  `${playingCards.join(' ')} (${getValue(playingCards)})` :
  '-';

// Exports.
module.exports = {
  createHand
};
