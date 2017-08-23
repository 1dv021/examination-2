/**
 * Module for DrawPile.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const PlayingCard = require('./PlayingCard');
const ns = require('./ns');

/**
 *  Class representing a draw pile.
 */
let DrawPile = (function() {

  const internal = ns();

  class DrawPile {
    /**
     * Creates a draw pile.
     *
     * @param {PlayingCard[]} [playingCards = []]
     */
    constructor(playingCards = []) {
      /**
       * The draw pile's playing cards.
       *
       * @type {PlayingCard[]}
       */
      internal(this).playingCards = [];

      // Combine the empty draw pile with the playing cards.
      this.combine(playingCards);
    }

    /**
     * Gets the number of playing cards in the draw pile.
     *
     * @returns {number}
     */
    get count () {
      return internal(this).playingCards.length;
    }

    /**
     * Creates a new object that is a copy of the current instance.
     *
     * @returns {DrawPile}
     */
    clone() {
      return new DrawPile(internal(this).playingCards);
    }

    /**
     * Combines draw pile's playing cards with the additional playing cards.
     *
     * @param {PlayingCard[]} playingCards
     * @returns {DrawPile}
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
     * Returns the drawn playing card(s).
     *
     * @param {number} [count = 1] - The number of playing cards to draw.
     * @returns {PlayingCard[]} - The drawn playing cards.
     */
    draw(count = 1) {
      return internal(this).playingCards.splice(0, count);
    }

    /**
     * Shuffles the draw pile's playing cards.
     *
     * @returns {DrawPile}
     */
    shuffle() {
      let i = internal(this).playingCards.length;
      let j;
      let x;

      while (i) {
        j = (Math.random() * i) | 0; // using bitwise OR 0 to floor a number
        x = internal(this).playingCards[--i];
        internal(this).playingCards[i] = internal(this).playingCards[j];
        internal(this).playingCards[j] = x;
      }

      return this;
    }

    /**
     * Returns an object to stringify.
     *
     * @returns {{nickName: *, hand: *, text: string}}
     */
    toJSON() {
      return {
        count: this.count,
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
      return internal(this).playingCards.join(' ');
    }
  }

  return DrawPile;
}());

// Exports.
module.exports = DrawPile;
