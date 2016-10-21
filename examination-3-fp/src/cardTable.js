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
  let _discardPile = [];
  let _drawPile = [...playingCards];
  let _hand = createHand();
  let _nickName = 'Dealer';

  /**
   * Inidicates if the dealer can hit.
   *
   * @returns {boolean}
   */
  const canHit = (hitLimit) => _hand.count() < 2 || _hand.value() < hitLimit;

  /**
   * Returns the top card of the draw pile.
   *
   * @returns {Object} 
   */
  const drawCard = () => {
    // If only one card left in the draw pile reuse the cards in the discard pile.
    if (_drawPile.length === 1) {
      _drawPile = _drawPile.concat(_discardPile.splice(0));
      _drawPile = util.shuffle(_drawPile);
    }

    return _drawPile.shift();
  };

  /**
   * Adds cards to the discard pile.
   *
   * @param {Object[]} playingCards
   */
  const addToDiscardPile = (playingCards) => _discardPile = _discardPile.concat(playingCards);

  /**
   * Shuffles the cards of the draw pile. 
   */
  const shuffle = () => _drawPile = util.shuffle(_drawPile);

  /**
   * Returns a string representing the object.
   */
  const toString = () => `${_nickName}: ${_hand.count() > 0 ? _hand.toString() : '-'}`;

  return {
    hand: () => _hand,
    nickName: () => _nickName,
    addToDiscardPile,
    canHit,
    drawCard,
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
  let _nickName = Number.isInteger(id) ? `Player #${id}` : id;
  let _hand = createHand();

  /**
   * Inidicates if the player can hit.
   *
   * @returns {boolean}
   */
  const canHit = () => _hand.count() < 2 || _hand.value() <= hitLimit;

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  const toString = () => `${_nickName}: ${_hand.count() > 0 ? _hand.toString() : '-'}`;

  return {
    nickName: () => _nickName,
    hand: () => _hand,
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
  let _playingCards = [];

  /**
   * Adds a card to the hand.
   */
  const add = (playingCard) => _playingCards = [..._playingCards, playingCard];

  /**
   * Discards all cards.
   *
   * @returns {Object[]}
   */
  const discard = () => _playingCards.splice(0);

  /**
   * Returns the number of cards.
   *
   * @returns {number}
   */
  const count =  () => _playingCards.length;

  /**
   * Returns the playing cards.
   *
   * @returns {Object[]}
   */
  const playingCards =  () => [..._playingCards];

  /**
   * Returns the hand's value.
   *
   * @returns {number}
   */
  const value = () => {
    // Compute the hand value where each ace is one point...
    let sum = _playingCards.reduce((sum, x) => sum + x.rank, 0);

    // ...and count exach ace as 14 point as long as the hand value i less than 21.
    let numberOfAces = _playingCards.filter(x => x.rank === Ranks.ACE).length;
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
  const toString = () => `${_playingCards.join(' ')} (${value()})`;

  return {
    add,
    discard,
    count,
    playingCards,
    value,
    toString
  };
};

// Exports.
module.exports = {
  createDealer,
  createPlayer,
  createHand
};
