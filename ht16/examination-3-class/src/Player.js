/**
 * Module for the Player class.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const Hand = require('./Hand');
const ns = require('./ns');

/**
 *  Class representing a player.
 */
let Player = (function() {

  const internal = ns();

  class Player {
    /**
     * Creates a player.
     *
     * @param {string} nickName
     * @param {Hand} [hand = new Hand()]
     */
    constructor(nickName, hand = new Hand()) {
      /**
       * The player's nick name.
       *
       * @type {string}
       */
      internal(this).nickName = nickName;

      /**
       * The player's hand.
       *
       * @type {Hand}
       */
      internal(this).hand = hand.clone();
    }

    /**
     * Gets the number of playing cards in the hand.
     *
     * @returns {number}
     */
    get handCount () {
      return internal(this).hand.count;
    }

    /**
     * Gets the player's hand's value, the sum of the ranks.
     *
     * @returns {number}
     */
    get handValue() {
      return internal(this).hand.value;
    }

    /**
     *
     * @returns {boolean}
     */
    get isBusted() {
      return internal(this).hand.value > 21;
    }

    /**
     *
     * @returns {boolean}
     */
    get isNaturalWinner() {
      return internal(this).hand.value === 21 ||
        internal(this).hand.value < 21 && internal(this).hand.count === 5;
    }

    /**
     *
     * @returns {string}
     */
    get nickName() {
      return internal(this).nickName;
    }

    /**
     * Adds playing card(s) to the player's hand.
     *
     * @param {PlayingCard|PlayingCard[]} playingCards
     * @returns {Player}
     */
    addToHand(playingCards) {
      internal(this).hand.combine(playingCards);

      return this;
    }

    /**
     * Returns a value indicating whether the player can hit or not.
     *
     * @param {number} standValue
     * @returns {boolean}
     */
    canHit(standValue = 14) {
      return internal(this).hand.value <= standValue &&
        internal(this).hand.count < 5;
    }

    /**
     * Discards all playing cards of the player's hand.
     *
     * @returns {PlayingCard[]}
     */
    discardHand() {
      return internal(this).hand.discardAll();
    }

    /**
     * Returns an object to stringify.
     *
     * @returns {{nickName: *, hand: *, text: string}}
     */
    toJSON() {
      return {
        nickName: internal(this).nickName,
        hand: internal(this).hand,
        text: this.toString()
      };
    }

    /**
     * Returns a string representing the object.
     *
     * @returns {string}
     */
    toString() {
      return `${internal(this).nickName}: ${internal(this).hand.toString()}`;
    }
  }

  return Player;
}());

// Exports.
module.exports = Player;
