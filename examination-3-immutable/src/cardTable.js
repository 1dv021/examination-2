/**
 * Module for card table functions.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const Ranks = require('./Ranks');
const utils = require('./utils');
const cardHand = require('./src/cardHand');

/**
 * Creates a new dealer.
 *
 * @returns {Object}
 */
const createDealer = (playingCards, discardPile = [], hand = cardHand.createHand(), nickName = 'Dealer') => {
  let _discardPile = Object.freeze([...discardPile]);
  let _drawPile = Object.freeze([...playingCards]);
  let _hand = Object.freeze(hand);

  /**
   * Returns the top card of the draw pile.
   *
   * @returns {Object} 
   */
  const drawCard = () => {
    // If only one card left in the draw pile reuse the cards in the discard pile.
    if (_drawPile.length === 1) {
      _drawPile = _drawPile.concat(_discardPile.splice(0));
      _drawPile = utils.shuffle(_drawPile);
    }

    return _drawPile.shift();
  };

  /**
   * Shuffles the cards of the draw pile. 
   */
  const shuffle = () => _drawPile = utils.shuffle(_drawPile);

  /**
   * Adds cards to the discard pile.
   *
   * @param {Object[]} playingCards
   */
  const throwIntoDiscardPile = (playingCards) =>
    _discardPile = _discardPile.concat(playingCards);

  return {
    hand: _hand,
    nickName,
    canHit: (hitLimit) => canHit(_hand, hitLimit),
    drawCard,
    shuffle,
    throwIntoDiscardPile,
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
  const canHit = () => _hand.getCount() < 2 || _hand.getValue() <= hitLimit;

  /**
   * Gets the hand.
   */
  const getHand = () => _hand;

  /**
   * Gets the nick name.
   */
  const getNickName = () => _nickName;

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  const toString = () => `${_nickName}: ${_hand.getCount() > 0 ? _hand.toString() : '-'}`;

  return {
    canHit: (hitLimit) => canHit(_hand, hitLimit),
    getHand,
    getNickName,
    toString
  };
};

/**
 * Inidicates if the hand can hit.
 *
 * @returns {boolean}
 */
const canHit = (hand, hitLimit) => hand.getCount() < 2 || hand.getValue() < hitLimit;

/**
 * Returns a string representing the object.
 */
const toString = () => `${nickName}: ${_hand.getCount() > 0 ?
    _hand.toString() : '-'}`;


// Exports.
module.exports = {
  createDealer,
  createPlayer
};
