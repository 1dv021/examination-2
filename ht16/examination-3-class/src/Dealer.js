/**
 * Module for the Dealer class.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const DrawPile = require('./DrawPile');
const Hand = require('./Hand');
const Player = require('./Player');
const PlayingCard = require('./PlayingCard');
const ns = require('./ns');

/**
 *  Class representing a dealer.
 */
let Dealer = (function() {

  const internal = ns();

  class Dealer extends Player{
    /**
     * Creates a dealer.
     *
     * @param {DrawPile} drawPile
     * @param {PlayingCard[]} discardPile
     * @param {string} nickName
     * @param {Hand} [hand = new Hand()]
     */
    constructor(drawPile = new DrawPile(), discardPile = [],
                nickName = 'Dealer', hand = new Hand()) {
      super(nickName, hand);

      /**
       * The dealer's draw pile.
       *
       * @type {DrawPile}
       */
      internal(this).drawPile = drawPile.clone();

      /**
       * The dealer's discard pile.
       *
       * @type {PlayingCard[]}
       */
      internal(this).discardPile = [];

      // Combine the empty discard pile with the discarded playing cards.
      this.collectDiscardedPlayingCards(discardPile);
    }

    /**
     * Collects the specified playing cards into the discard pile.
     *
     * @param {PlayingCard[]}discardedPlayingCards
     * @returns {Dealer}
     */
    collectDiscardedPlayingCards(discardedPlayingCards) {
      if (!discardedPlayingCards.every(x => x instanceof PlayingCard)) {
        throw new TypeError('Expected references to PlayingCard objects.');
      }

      internal(this).discardPile =
        internal(this).discardPile.concat(discardedPlayingCards);

      return this;
    }

    /**
     * Gets playing cards from the draw pile.
     *
     * @param {number} [count = 1]
     * @returns {PlayingCard[]}
     */
    deal(count = 1) {
      // If only one card left in the draw pile reuse the cards in the discard pile.
      if (internal(this).drawPile.count === 1) {
        internal(this).drawPile.combine(internal(this).discardPile.splice(0));
        internal(this).drawPile.shuffle();
      }

      return internal(this).drawPile.draw(count);
    }

    /**
     *
     */
    shuffle() {
      internal(this).drawPile.shuffle();
    }

    /**
     * Returns an object to stringify.
     *
     * @returns {{nickName: *, hand: *, text: string}}
     */
    toJSON() {
      return Object.assign(Object.assign({}, super.toJSON()), {
        drawPile: internal(this).drawPile,
        discardPile: internal(this).discardPile,
        text: this.toString()
      });
    }

  }

  return Dealer;
}());

// Exports.
module.exports = Dealer;
