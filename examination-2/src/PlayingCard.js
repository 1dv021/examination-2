/**
 * Module for the type PlayingCard.
 *
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const Ranks = require('./Ranks')

/**
 * Creates a new PlayingCard object.
 *
 * @param {Ranks} rank
 * @param {Suits} suit
 * @constructor
 */
function PlayingCard (rank, suit) {
  /**
   * The rank of the playing card.
   *
   * @type {Ranks}
   */
  this.rank = rank

  /**
   * The suit of the playing card.
   *
   * @type {Suits}
   */
  this.suit = suit

  // Make the object immutable.
  Object.freeze(this)
}

/**
 * Converts the current PlayingCard object to its equivalent string representation.
 *
 * @returns {string}
 */
PlayingCard.prototype.toString = function () {
  // If Ace, Jack, Queen, or King use the first character; otherwise the rank.
  return (this.rank > 10 ? (Object.keys(Ranks)[this.rank - 2]).substr(0, 1) : this.rank) + this.suit
}

/**
 * Converts the the current PlayingCard object to its equivalent value representation.
 *
 * @returns {number}
 */
PlayingCard.prototype.valueOf = function () {
  return this.rank
}

// Exports
module.exports = PlayingCard
