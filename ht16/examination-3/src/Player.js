/**
 * Module for the type Player.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const Hand = require('./Hand');

/**
 * Creates a new Player object.
 *
 * @param {string} name The name of the player.
 * @constructor
 */
function Player(name) {

  /**
   * The hand of the current Player object.
   *
   * @type {Hand}
   */
  this.hand = Object.freeze(new Hand());

  /**
   * The name associated with the current Player object.
   *
   * @type {string}
   */
  this.name = name;
}

/**
 * Adds a playing card to the current Player object's hand.
 *
 * @param {PlayingCard} playingCard
 */
Player.prototype.addPlayingCard = function(playingCard) {
  this.hand = Object.assign(new Hand(), this.hand);
  this.hand.addPlayingCard(playingCard);
  Object.freeze(this.hand);
};

/**
 * Indicates whether the current Player object can draw a new playing card or not.
 *
 * @param {number} maxPointValue
 */
Player.prototype.canDrawPlayingCard = function(maxPointValue = Player.MAX_POINT_VALUE_OF_HAND_TO_DRAW_CARD) {
  return this.hand.count < 5 &&
    this.handValue <= maxPointValue;
};

/**
 * Throws the hand of the current Player object.
 */
Player.prototype.throwAway = function() {
  this.hand.removeAllPlayingCards();
};

/**
 * Converts the value of the current Player object to its equivalent string representation.
 */
Player.prototype.toString = function() {
  return this.name + ': ' + (this.handValue > 0 ? this.hand.toString() + ' (' + this.handValue + ')' : '-');
};

/**
 * @constant
 * @static
 * @type {number}
 */
Object.defineProperty(Player, 'MAX_POINT_VALUE_OF_HAND_TO_DRAW_CARD', {
  value: 14,
  writable: false,
  enumerable: true,
  configurable: true
});

/**
 * Gets the sum of the point value of the current Player object's hand.
 */
Object.defineProperty(Player.prototype, 'handValue', {

  /**
   * @returns {number}
   */
  get: function() {
    return this.hand.pointValue;
  }
});

// Exports
module.exports = Player;
