/**
 * Module for the type Dealer.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

var Player = require('./Player');

/**
 * Creates a new Dealer object.
 *
 * @param {string} name The name of the dealer.
 * @constructor
 */
function Dealer(name) {
  Player.call(this, name); // inherit: apply -> all arguments, call -> specific argument(s)
}

// Inherit from the base class Player
Dealer.prototype = Object.create(Player.prototype);
Dealer.prototype.constructor = Dealer;
Dealer.prototype.base = Player;

/**
 * Indicates whether the current Dealer object can draw a new playing card or not.
 *
 * @param {number} maxPointValue
 */
Dealer.prototype.canDrawPlayingCard = function(maxPointValue) {
  return this.hand.count < 5 &&
    this.handValue < maxPointValue;
};


/**
 * Slides a playing card from the front of the dealer shoe and pushes it to the receiving player.
 *
 * @param {DealerShoe} dealerShoe
 * @param {(Player|Dealer)} receiver
 */
Dealer.prototype.deal = function(dealerShoe, receiver) {
  receiver.addPlayingCard(dealerShoe.slide());
};

// Exports
module.exports = Dealer;
