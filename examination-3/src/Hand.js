/**
 * Module for the type Hand.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const Ranks = require('./Ranks');

/**
 * Creates a new Hand object.
 *
 * @constructor
 */
function Hand() {

  /**
   * The playing cards of the current Hand object.
   *
   * @type {PlayingCard[]}
   */
  this.playingCards = Object.freeze([]);
}

/**
 * Adds a playing card to the current Hand object.
 *
 * @param {PlayingCard} playingCard
 */
Hand.prototype.addPlayingCard = function(playingCard) {
  this.playingCards = this.playingCards.slice();
  this.playingCards.push(playingCard);
  Object.freeze(this.playingCards);
};

/**
 * Removes all playing cards of the current Hand object.
 */
Hand.prototype.removeAllPlayingCards = function() {
  this.playingCards = Object.freeze([]);
};

/**
 * Converts the value of the current Hand object to its equivalent string representation.
 */
Hand.prototype.toString = function() {
  return this.playingCards.join(' ');
};

/**
 * Gets the number of playing cards for the current Hand object.
 */
Object.defineProperty(Hand.prototype, 'count', {

  /**
   * @returns {number}
   */
  get: function() {
    return this.playingCards.length;
  }
});

/**
 * Gets the sum of the point values for the current Hand object.
 */
Object.defineProperty(Hand.prototype, 'pointValue', {

  /**
   * @returns {number}
   */
  get: function() {

    // Ace one point!
    let sum = this.playingCards.reduce((sum, x) => sum + x.rank, 0);

    // Ace 1 or 14 points!
    let numberOfAces = this.playingCards.filter(x => x.rank === Ranks.ACE).length;
    while (numberOfAces > 0 && sum + 13 < 21) {
      sum += 13;
      numberOfAces -= 1;
    }

    return sum;
  }
});

// Exports
module.exports = Hand;
