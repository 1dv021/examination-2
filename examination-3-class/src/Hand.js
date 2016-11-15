/**
 * Module for hand.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const PlayingCard = require('./PlayingCard');
const Ranks = require('./Ranks');
const ns = require('./ns');

/**
 *  Class representing a playing card hand.
 */
let Hand = (function() {

  const internal = ns();

  class Hand {
    /**
     * Creates a hand.
     *
     * @param {PlayingCard[]} [playingCards = []]
     */
    constructor(playingCards = []) {
      /**
       * The hand's playing cards.
       *
       * @type {PlayingCard[]}
       */
      internal(this).playingCards = [];

      // Combine the empty hand with the playing cards.
      this.combine(playingCards);
    }

    /**
     * Gets the number of playing cards in the hand.
     *
     * @returns {number}
     */
    get count () {
      return internal(this).playingCards.length;
    }

    /**
     * Gets the hand's value, the sum of the ranks.
     *
     * @returns {number}
     */
    get value () {
      // Compute the hand value where each ace is 14 points.
      let handValue = internal(this).playingCards.reduce((sum, x) => sum + x.rank, 0);

      // ...and count each ace as one point as long as the hand value i greater than 21.
      let numberOfAces = internal(this).playingCards.filter(x => x.rank === Ranks.ACE).length;
      while (numberOfAces-- > 0 && handValue > 21) {
        handValue -= 13;
      }

      return handValue;
    }

    /**
     * Adds playing card(s) to the hand.
     *
     * @param {PlayingCard|PlayingCard[]} playingCards
     * @returns {Hand}
     */
    add(playingCards) {
      if (typeof playingCards[Symbol.iterator] !== 'function') {
        playingCards = [playingCards];
      }
      if (!playingCards.every(x => x instanceof PlayingCard)) {
        throw new TypeError('Expected references to PlayingCard objects.');
      }

      internal(this).playingCards =
        internal(this).playingCards.combine(playingCards);

      return this;
    }

    /**
     * Combines hand's playing cards with the additional playing cards.
     *
     * @param {PlayingCard[]} playingCards
     * @returns {Hand}
     */
    combine(playingCards) {
      if (!playingCards.every(x => x instanceof PlayingCard)) {
        throw new TypeError('Expected references to PlayingCard objects.');
      }

      internal(this).playingCards =
        internal(this).playingCards.concat(playingCards);

      return this;
    }

    /**
     * Creates a new object that is a copy of the current instance.
     *
     * @returns {Hand}
     */
    clone() {
      return new Hand(internal(this).playingCards);
    }

    /**
     * Discards the playing cards from the hand.
     *
     * @returns {PlayingCard[]}
     */
    discardAll() {
      return internal(this).playingCards.splice(0);
    }

    /**
     * Returns an object to stringify.
     *
     * @returns {{count: number, value: number, playingCards: PlayingCard[], text: string}}
     */
    toJSON() {
      return {
        count: this.count,
        value: this.value,
        playingCards: internal(this).playingCards,
        text: this.toString()
      };
    }

    /**
     * Returns a string representing the object.
     *
     * @returns {string}
     */
    toString() {
      return this.count > 0 ?
        `${internal(this).playingCards.join(' ')} (${this.value})` :
        '-';
    }
  }

  return Hand;
}());

// Exports.
module.exports = Hand;
