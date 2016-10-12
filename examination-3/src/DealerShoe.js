/**
 * Module for the type DealerShoe.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

/**
 * Creates a new DealerShoe object.
 *
 * @constructor
 */
function DealerShoe() {

  /**
   * The playing cards in the dealer's shoe.
   *
   * @type {PlayingCard[]}
   */
  this.playingCards = [];
}

/**
 * Slides one playing card out of the dealer's shoe.
 *
 * @return {PlayingCard} The playing card slided from the dealer's shoe.
 */
DealerShoe.prototype.slide = function() {
  if (this.playingCards.length === 0) {
    throw new Error('All cards are drawn from the dealer shoe.');
  }

  return this.playingCards.shift();
};

/**
 * Loads cards into the dealer's shoe.
 *
 * @param {PlayingCard[]} playingCards The playing cards to load into the dealer's shoe.
 */
DealerShoe.prototype.load = function(playingCards) {
  this.playingCards = playingCards.slice();
};

// Exports
module.exports = DealerShoe;

