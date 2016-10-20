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

  /**
   * Inidicates if the dealer can hit.
   *
   * @returns {boolean}
   */
  const canHit = (hitLimit) => hand.getCount() < 2 || hand.getValue() < hitLimit;

  /**
   * Returns the top card of the draw pile.
   *
   * @returns {Object} 
   */
  const drawCard = () => {
    // If only one card left in the draw pile reuse the cards in the discard pile.
    if (drawPile.length === 1) {
      drawPile = drawPile.concat(discardPile.splice(0));
      drawPile = util.shuffle(drawPile);
    }

    return drawPile.shift();
  };

  /**
   * Adds cards to the discard pile.
   *
   * @param {Object[]} playingCards
   */
  const addToDiscardPile = (playingCards) => discardPile = discardPile.concat(playingCards);

  /**
   * Shuffles the cards of the draw pile. 
   */
  const shuffle = () => drawPile = util.shuffle(drawPile);

  /**
   * Returns a string representing the object.
   */
  const toString = () => `${nickName}: ${hand.getCount() > 0 ? hand.toString() : '-'}`;

  return {
    canHit,
    hand,
    drawCard,
    nickName,
    addToDiscardPile,
    shuffle,
    toString
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

  /**
   * Inidicates if the player can hit.
   *
   * @returns {boolean}
   */
  const canHit = () => hand.getCount() < 2 || hand.getValue() <= hitLimit;

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  const toString = () => `${nickName}: ${hand.getCount() > 0 ? hand.toString() : '-'}`;

  return {
    nickName,
    hand,
    canHit,
    toString
  };
};

/**
 * Creates a new hand.
 *
 * @returns {Object}
 */
const createHand = () => {
  let playingCards = [];

  /**
   * Adds a card to the hand.
   */
  const add = (playingCard) => playingCards = [...playingCards, playingCard];

  /**
   * Discards all cards.
   *
   * @returns {Object[]}
   */
  const discard = () => playingCards.splice(0);

  /**
   * Returns the number of cards.
   */
  const getCount =  () => playingCards.length;

  /**
   * Returns the hand's value.
   *
   * @returns {number}
   */
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

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  const toString = () => `${playingCards.join(' ')} (${getValue()})`;

  return {
    add,
    getCount,
    discard,
    getValue,
    toString
  };
};

// Exports.
module.exports = {
  createDealer,
  createPlayer,
  createHand
};
